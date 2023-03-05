<template>
<transition name="zoom-in-top">
	<div class="buebdbiu" ref="popover" v-if="show">
		<div class="reaction">
			<mk-reaction-icon class="icon" :reaction="reaction" :custom-emojis="customEmojis" :noStyle="true" ref="icon"/>
			<div class="name">{{ getReactionName(reaction) }}</div>
		</div>
		<div class="users">
			<div class="user" v-for="u in users" :key="u.id">
				<mk-avatar class="avatar" :user="u" style="width: 24px; height: 24px; margin-right: 4px;"/>
				<mk-user-name class="name" :user="u" :nowrap="true"/>
			</div>
			<div v-if="users.length > 10" class="omitted">+{{ count - 10 }}</div>
		</div>
	</div>
</transition>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '../../../i18n';
import { getEmojiName } from '../../scripts/get-emoji-name';

export default Vue.extend({
	i18n: i18n('common/views/components/reactions-viewer.details.vue'),
	props: {
		reaction: {
			type: String,
			required: true,
		},
		customEmojis: {
			required: false,
			default: () => undefined as any[]
		},
		users: {
			type: Array,
			required: true,
		},
		count: {
			type: Number,
			required: true,
		},
		source: {
			required: true,
		}
	},
	data() {
		return {
			show: false
		};
	},
	mounted() {
		this.show = true;

		this.$nextTick(() => {
			const popover = this.$refs.popover as any;

			if (this.source == null) {
				this.destroyDom();
				return;
			}
			const rect = this.source.getBoundingClientRect();

			const x = rect.left + window.pageXOffset + (this.source.offsetWidth / 2);
			const y = rect.top + window.pageYOffset + this.source.offsetHeight;
			popover.style.left = (x - 28) + 'px';
			popover.style.top = (y + 16) + 'px';
		});
	},
	methods: {
		close() {
			this.show = false;
			setTimeout(this.destroyDom, 300);
		},
		getReactionName(reaction: string): string {
			const trimLocal = reaction.replace('@.', '');
				if (trimLocal.startsWith(':')) {
				return trimLocal;
			}
			return getEmojiName(reaction) ?? reaction;
		}
	}
})
</script>

<style lang="stylus" scoped>
.buebdbiu
	$bgcolor = var(--popupBg)
	display flex
	z-index 10000
	position absolute
	padding 8px
	background $bgcolor
	color var(--text)
	border-radius 4px
	box-shadow 0 var(--lineWidth) 4px rgba(#000, 0.25)
	pointer-events none
	transform-origin center -16px

	> .reaction
		max-width 120px
		margin-left 4px
		text-align center

		> .icon
			display block
			margin 0 auto
			width 64px
			font-size 64px

		> .name
			font-size 0.8em

	> .users 
		flex 1
		min-width 0
		font-size 0.95em
		border-left solid 0.5px var(--faceDivider)
		padding-left 12px
		margin-left 10px
		margin-right 12px
		text-align left

		> .user
			line-height 24px
			white-space nowrap
			overflow hidden
			text-overflow ellipsis

			&:not(:last-child)
				margin-bottom 4px

	&:before
		content ""
		pointer-events none
		display block
		position absolute
		top -28px
		left 12px
		border-top solid 14px transparent
		border-right solid 14px transparent
		border-bottom solid 14px rgba(#000, 0.1)
		border-left solid 14px transparent

	&:after
		content ""
		pointer-events none
		display block
		position absolute
		top -27px
		left 12px
		border-top solid 14px transparent
		border-right solid 14px transparent
		border-bottom solid 14px $bgcolor
		border-left solid 14px transparent

</style>
