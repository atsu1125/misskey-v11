export default function(me, settings, note) {
	const isMyNote = me && (note.userId == me.id);
	const isPureRenote = note.renoteId != null && note.text == null && note.fileIds.length == 0 && note.poll == null;

	const includesMutedWords = (text: string) =>
		text
			? settings.mutedWords.some(q => q.length > 0 && !q.some(word =>
				word.startsWith('/') && word.endsWith('/') ? !(new RegExp(word.substring(1, word.length - 1)).test(text)) : !text.includes(word)))
			: false;

	return (
		(!isMyNote && note.reply && includesMutedWords(note.reply.text)) ||
		(!isMyNote && note.renote && includesMutedWords(note.renote.text)) ||
		(!settings.showMyRenotes && isMyNote && isPureRenote) ||
		(!settings.showRenotedMyNotes && isPureRenote && note.renote.userId == me.id) ||
		(!settings.showLocalRenotes && isPureRenote && note.renote.user.host == null) ||
		(!isMyNote && includesMutedWords(note.text))
	);
}
