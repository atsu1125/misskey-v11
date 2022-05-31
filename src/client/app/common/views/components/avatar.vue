<template>
	<span class="mk-avatar" :style="style" :class="{ cat }" :title="user | acct" v-if="disableLink && !disablePreview" v-user-preview="user.id" @click="onClick" v-once>
		<span class="inner" :style="icon" decoding="async"></span>
	</span>
	<span class="mk-avatar" :style="style" :class="{ cat }" :title="user | acct" v-else-if="disableLink && disablePreview" @click="onClick" v-once>
		<span class="inner" :style="icon" decoding="async"></span>
	</span>
	<router-link class="mk-avatar" :style="style" :class="{ cat }" :to="user | userPage" :title="user | acct" :target="target" v-else-if="!disableLink && !disablePreview" v-user-preview="user.id" v-once>
		<span class="inner" :style="icon" decoding="async"></span>
	</router-link>
	<router-link class="mk-avatar" :style="style" :class="{ cat }" :to="user | userPage" :title="user | acct" :target="target" v-else-if="!disableLink && disablePreview" v-once>
		<span class="inner" :style="icon" decoding="async"></span>
	</router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import { getStaticImageUrl } from '../../../common/scripts/get-static-image-url';

export default Vue.extend({
	props: {
		user: {
			type: Object,
			required: true
		},
		target: {
			required: false,
			default: null
		},
		disableLink: {
			required: false,
			default: false
		},
		disablePreview: {
			required: false,
			default: false
		}
	},
	computed: {
		lightmode(): boolean {
			return this.$store.state.device.lightmode;
		},
		cat(): boolean {
			return this.user.isCat && this.$store.state.settings.circleIcons;
		},
		style(): any {
			return {
				borderRadius: this.$store.state.settings.circleIcons ? '100%' : null
			};
		},
		url(): string {
			return this.$store.state.device.disableShowingAnimatedImages
				? getStaticImageUrl(this.user.avatarUrl)
				: this.user.avatarUrl;
		},
		icon(): any {
			return {
				backgroundColor: this.user.avatarColor,
				backgroundImage: this.lightmode ? null : `url(${this.url})`,
				borderRadius: this.$store.state.settings.circleIcons ? '100%' : null
			};
		}
	},
	mounted() {
		if (this.user.avatarColor) {
			this.$el.style.color = this.user.avatarColor;
		}
	},
	methods: {
		onClick(e) {
			this.$emit('click', e);
		}
	}
});
</script>

<style lang="stylus" scoped>
@keyframes earwiggleleft
	from { transform: rotate(37.6deg) skew(30deg); }
	25% { transform: rotate(10deg) skew(30deg); }
	50% { transform: rotate(20deg) skew(30deg); }
	75% { transform: rotate(0deg) skew(30deg); }
	to { transform: rotate(37.6deg) skew(30deg); }

@keyframes earwiggleright
	from { transform: rotate(-37.6deg) skew(-30deg); }
	30% { transform: rotate(-10deg) skew(-30deg); }
	55% { transform: rotate(-20deg) skew(-30deg); }
	75% { transform: rotate(0deg) skew(-30deg); }
	to { transform: rotate(-37.6deg) skew(-30deg); }

.mk-avatar
	display inline-block
	vertical-align bottom
	flex-shrink 0

	&:not(.cat)
		overflow hidden
		border-radius 8px

	&.cat::before,
	&.cat::after
		background #df548f
		border solid 4px var(--bg)
		box-sizing border-box
		content ''
		display inline-block
		height 50%
		width 50%

	&.cat::before
		border-radius 0 75% 75%
		transform rotate(37.5deg) skew(30deg)

	&.cat::after
		border-radius 75% 0 75% 75%
		transform rotate(-37.5deg) skew(-30deg)

	&.cat:hover
		&::before
			animation: earwiggleleft 1s infinite;
		&::after
			animation: earwiggleright 1s infinite;

	.inner
		background-position center center
		background-size cover
		bottom 0
		left 0
		position absolute
		right 0
		top 0
		transition border-radius 1s ease
		z-index 1
</style>
