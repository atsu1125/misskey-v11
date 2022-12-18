<template>
<div class="mk-notification-preview" :class="notification.type">
	<template v-if="notification.type == 'reaction'">
		<mk-avatar class="avatar" :user="notification.user"/>
		<div class="text">
			<p class="icon-user"><mk-reaction-icon :reaction="notification.reaction" :custom-emojis="notification.note.emojis"/><mk-user-name :user="notification.user"/></p>
			<p class="note-ref"><fa icon="quote-left"/>{{ getNoteSummary(notification.note) }}<fa icon="quote-right"/></p>
		</div>
	</template>

	<template v-if="notification.type == 'renote'">
		<mk-avatar class="avatar" :user="notification.note.user"/>
		<div class="text">
			<p class="icon-user"><fa icon="retweet"/><mk-user-name :user="notification.note.user"/></p>
			<p class="note-ref"><fa icon="quote-left"/>{{ getNoteSummary(notification.note.renote) }}<fa icon="quote-right"/></p>
		</div>
	</template>

	<template v-if="notification.type == 'quote'">
		<mk-avatar class="avatar" :user="notification.note.user"/>
		<div class="text">
			<p class="icon-user"><fa icon="quote-left"/><mk-user-name :user="notification.note.user"/></p>
			<p class="note-preview">{{ getNoteSummary(notification.note) }}</p>
		</div>
	</template>

	<template v-if="notification.type == 'follow'">
		<mk-avatar class="avatar" :user="notification.user"/>
		<div class="text">
			<p class="icon-user"><fa icon="user-plus"/><mk-user-name :user="notification.user"/></p>
			<span class="notify-info">{{ $t('youGotNewFollower') }}</span>
		</div>
	</template>

	<template v-if="notification.type == 'receiveFollowRequest'">
		<mk-avatar class="avatar" :user="notification.user"/>
		<div class="text">
			<p class="icon-user"><fa icon="user-clock"/><mk-user-name :user="notification.user"/></p>
			<span class="notify-info">{{ $t('receiveFollowRequest') }}</span>
		</div>
	</template>

	<template v-if="notification.type == 'reply'">
		<mk-avatar class="avatar" :user="notification.note.user"/>
		<div class="text">
			<p class="icon-user"><fa icon="reply"/><mk-user-name :user="notification.note.user"/></p>
			<p class="note-preview">{{ getNoteSummary(notification.note) }}</p>
		</div>
	</template>

	<template v-if="notification.type == 'mention'">
		<mk-avatar class="avatar" :user="notification.note.user"/>
		<div class="text">
			<p class="icon-user"><fa icon="at"/><mk-user-name :user="notification.note.user"/></p>
			<p class="note-preview">{{ getNoteSummary(notification.note) }}</p>
		</div>
	</template>

	<template v-if="notification.type == 'pollVote'">
		<mk-avatar class="avatar" :user="notification.user"/>
		<div class="text">
			<p class="icon-user"><fa icon="chart-pie"/><mk-user-name :user="notification.user"/></p>
			<p class="note-ref"><fa icon="quote-left"/>{{ getNoteSummary(notification.note) }}<fa icon="quote-right"/></p>
		</div>
	</template>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '../../../i18n';
import getNoteSummary from '../../../../../misc/get-note-summary';

export default Vue.extend({
	i18n: i18n('mobile/views/components/notification.vue'),

	props: ['notification'],
	data() {
		return {
			getNoteSummary
		};
	}
});
</script>

<style lang="stylus" scoped>
.mk-notification-preview
	margin 0
	padding 8px
	color #fff
	overflow-wrap break-word

	&:after
		content ""
		display block
		clear both

	> .avatar
		display block
		float left
		width 36px
		height 36px
		border-radius 6px

	> .text
		float right
		width calc(100% - 36px)
		padding-left 8px

		p
			margin 0

			[data-icon], mk-reaction-icon
				margin-right 4px

	.note-ref
		[data-icon]
			color var(--noteText)
			display inline-block
			font-size: 50%
			opacity: 0.5
			vertical-align: super

		[data-icon]:first-child
			margin-left: 4px
			margin-right: 4px

		[data-icon]:last-child
			margin-left: 4px

	.notify-info
		color var(--noteText)
		display inline-block
		width: 100%
		opacity: 0.5

	&.reply, &.mention
		> .text > .icon-user [data-icon]
			color #007aff

	&.renote, &.quote
		> .text > .icon-user [data-icon]
			color #36d298

	&.follow
		> .text > .icon-user [data-icon]
			color #36aed2

	&.followRequest, &.pollVote
		> .text > .icon-user [data-icon]
			color #5e7c8c

</style>
