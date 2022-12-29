<template>
<div class="mkw-aichan">
  <iframe class="dedjhjmo" ref="live2d" src="https://misskey-dev.github.io/mascot-web/?scale=1.5&y=1.1&eyeY=100"></iframe>
</div>
</template>

<script lang="ts">
import define from '../../../common/define-widget';

export default define({
	name: 'aichan',
}).extend({
  mounted() {
		window.addEventListener('mousemove', ev => {
			const iframeRect = this.$refs.live2d.getBoundingClientRect();
			this.$refs.live2d.contentWindow.postMessage({
				type: 'moveCursor',
				body: {
					x: ev.clientX - iframeRect.left,
					y: ev.clientY - iframeRect.top,
				}
			}, '*');
		}, { passive: true });
	},
});
</script>

<style lang="stylus" scoped>
.dedjhjmo
	width 100%
	height 300px
	border none
	pointer-events none
</style>
