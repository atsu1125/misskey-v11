<template>
<div class="mk-notify" :class="pos">
	<div>
		<mk-notification-preview :notification="notification"/>
	</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as config from '../../../config';
import anime from 'animejs';

export default Vue.extend({
	props: ['notification'],
	computed: {
		pos() {
			return this.$store.state.device.mobileNotificationPosition;
		}
	},
	mounted() {
		this.onNotify();
		this.$nextTick(() => {
			anime({
				targets: this.$el,
				[this.pos]: '0px',
				duration: 500,
				easing: 'easeOutQuad'
			});

			setTimeout(() => {
				anime({
					targets: this.$el,
					[this.pos]: `-${this.$el.offsetHeight}px`,
					duration: 500,
					easing: 'easeOutQuad',
					complete: () => this.destroyDom()
				});
			}, 6000);
		});
	},

	methods: {
		onNotify() {
			if (this.$store.state.device.enableSounds && this.$store.state.device.enableSoundsInNotifications) {
				const sound = new Audio(`${config.url}/assets/notify.mp3`);
				sound.volume = this.$store.state.device.soundVolume;
				sound.play();
			}
		}
	}
});
</script>

<style lang="stylus" scoped>
.mk-notify
	$height = 78px

	position fixed
	z-index 10000
	left 0
	right 0
	width 100%
	max-width 500px
	height $height
	margin 0 auto
	padding 8px
	pointer-events none
	font-size 80%

	&.bottom
		bottom -($height)

	&.top
		top -($height)

	> div
		height 100%
		background-color rgba(#000, 0.7)
		border-radius 6px
		overflow hidden

</style>
