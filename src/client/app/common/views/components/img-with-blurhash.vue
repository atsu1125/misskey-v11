<template>
<div class="xubzgfgb" :title="title">
	<canvas ref="canvas" :width="size" :height="size" :title="title" v-if="!loaded"/>
	<img v-if="src" :src="src" :title="title" :alt="alt" @load="onLoad"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { decode } from 'blurhash';

export default Vue.extend({
	props: {
		src: {
			type: String,
			required: false,
			default: null
		},
		hash: {
			type: String,
			required: true
		},
		alt: {
			type: String,
			required: false,
			default: '',
		},
		title: {
			type: String,
			required: false,
			default: null,
		},
		size: {
			type: Number,
			required: false,
			default: 64
		},
	},

	data() {
		return {
			loaded: false,
		};
	},

	mounted() {
		if (this.hash) { this.draw(); }
	},

	methods: {
		draw() {
			const pixels = decode(this.hash, this.size, this.size);
			const ctx = (this.$refs.canvas as HTMLCanvasElement).getContext('2d');
			const imageData = ctx!.createImageData(this.size, this.size);
			imageData.data.set(pixels);
			ctx!.putImageData(imageData, 0, 0);
		},

		onLoad() {
			this.loaded = true;
		}
	}
});
</script>

<style lang="stylus" scoped>
.xubzgfgb
	width 100%
	height 100%

	> canvas
		width 100%
		height 100%
		object-fit cover

	> img
		width 100%
		height 100%
		object-fit contain

</style>
