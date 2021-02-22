import { DriveFile } from '../../models/entities/drive-file';
import { InternalStorage } from './internal-storage';
import { DriveFiles, Instances } from '../../models';
import { driveChart, perUserDriveChart, instanceChart } from '../chart';
import { createDeleteObjectStorageFileJob } from '../../queue';
import { fetchMeta } from '../../misc/fetch-meta';
import { getS3 } from './s3';
import { v4 as uuid } from 'uuid';
import { getConnection } from 'typeorm';
import { Note } from '../../models/entities/note';

export async function deleteFile(file: DriveFile, isExpired = false) {
	if (file.storedInternal) {
		InternalStorage.del(file.accessKey!);

		if (file.thumbnailUrl) {
			InternalStorage.del(file.thumbnailAccessKey!);
		}

		if (file.webpublicUrl) {
			InternalStorage.del(file.webpublicAccessKey!);
		}
	} else if (!file.isLink) {
		createDeleteObjectStorageFileJob(file.accessKey!);

		if (file.thumbnailUrl) {
			createDeleteObjectStorageFileJob(file.thumbnailAccessKey!);
		}

		if (file.webpublicUrl) {
			createDeleteObjectStorageFileJob(file.webpublicAccessKey!);
		}
	}

	postProcess(file, isExpired);
}

export async function deleteFileSync(file: DriveFile, isExpired = false) {
	if (file.storedInternal) {
		InternalStorage.del(file.accessKey!);

		if (file.thumbnailUrl) {
			InternalStorage.del(file.thumbnailAccessKey!);
		}

		if (file.webpublicUrl) {
			InternalStorage.del(file.webpublicAccessKey!);
		}
	} else if (!file.isLink) {
		const promises = [];

		promises.push(deleteObjectStorageFile(file.accessKey!));

		if (file.thumbnailUrl) {
			promises.push(deleteObjectStorageFile(file.thumbnailAccessKey!));
		}

		if (file.webpublicUrl) {
			promises.push(deleteObjectStorageFile(file.webpublicAccessKey!));
		}

		await Promise.all(promises);
	}

	await postProcess(file, isExpired);
}

async function postProcess(file: DriveFile, isExpired = false) {
	// リモートファイル期限切れ削除後は直リンクにする
	if (isExpired && file.userHost !== null && file.uri != null) {
		DriveFiles.update(file.id, {
			isLink: true,
			url: file.uri,
			thumbnailUrl: null,
			webpublicUrl: null,
			size: 0,
			// ローカルプロキシ用
			accessKey: uuid(),
			thumbnailAccessKey: 'thumbnail-' + uuid(),
			webpublicAccessKey: 'webpublic-' + uuid(),
		});
	} else {
		await getConnection().transaction(async transactionalEntityManager => {
			await transactionalEntityManager.delete(DriveFile, file.id);

			await transactionalEntityManager.createQueryBuilder()
				.delete()
				.from(Note)
				.where(':id = ANY(fileIds)', { id: file.id })
				.execute();
		});
	}

	// 統計を更新
	driveChart.update(file, false);
	perUserDriveChart.update(file, false);
	if (file.userHost !== null) {
		instanceChart.updateDrive(file, false);
		Instances.decrement({ host: file.userHost }, 'driveUsage', file.size);
		Instances.decrement({ host: file.userHost }, 'driveFiles', 1);
	}
}

export async function deleteObjectStorageFile(key: string) {
	const meta = await fetchMeta();

	const s3 = getS3(meta);

	await s3.deleteObject({
		Bucket: meta.objectStorageBucket!,
		Key: key
	}).promise();
}
