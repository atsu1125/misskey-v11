<template>
	<mk-window ref="window" is-modal width="800px" :can-close="false">
		<template #header>{{ title }}</template>

		<div class="hjirwjri">
			<div class="body">
				<vue-cropper ref="cropper"
					:src="imageUrl"
					:view-mode="1"
					:aspect-ratio="aspectRatio"
					:container-style="{ width: '100%', 'max-height': '400px' }"
				/>
			</div>
			<div class="footer">
				<ui-button inline @click="skip" style="margin-right:16px;">{{ $t('skip') }}</ui-button>
				<ui-button inline @click="cancel" style="margin-right:16px;">{{ $t('cancel') }}</ui-button>
				<ui-button inline @click="ok" primary>{{ $t('ok') }}</ui-button>
			</div>
		</div>
	</mk-window>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '../../../i18n';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import * as url from '../../../../../prelude/url';

export default Vue.extend({
	i18n: i18n('desktop/views/components/crop-window.vue'),
	components: {
		VueCropper
	},
	props: {
		image: {
			type: Object,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		aspectRatio: {
			type: Number,
			required: true
		}
	},
	computed: {
		imageUrl() {
			return `/proxy/?${url.query({
				url: this.image.url
			})}`;
		},
	},
	methods: {
		ok() {
			(this.$refs.cropper as any).getCroppedCanvas().toBlob(blob => {
				this.$emit('cropped', blob);
				(this.$refs.window as any).close();
			});
		},

		skip() {
			this.$emit('skipped');
			(this.$refs.window as any).close();
		},

		cancel() {
			this.$emit('canceled');
			(this.$refs.window as any).close();
		}
	}
});
</script>

<style lang="stylus" scoped>
.hjirwjri
	display flex
	flex-direction column
	height 100%

	.body
		flex 1

		img
			width 100%
			max-height 400px

	.footer
		padding 16px
		background var(--desktopPostFormBg)
		text-align right

</style>

<style lang="stylus">
.cropper-modal {
	opacity: 0.8;
}

.cropper-view-box {
	outline-color: var(--primary);
}

.cropper-line, .cropper-point {
	background-color: var(--primary);
}

.cropper-bg {
	animation: cropper-bg 0.5s linear infinite;
}

@keyframes cropper-bg {
	0% {
		background-position: 0 0;
	}

	100% {
		background-position: -8px -8px;
	}
}
</style>
