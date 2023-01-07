<template>
<div class="gcafiosrssbtbnbzqupfmglvzgiaipyv">
	<x-picker @chosen="chosen"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import contains from '../../scripts/contains';

export default Vue.extend({
	components: {
		XPicker: () => import('./emoji-picker.vue').then(m => m.default)
	},

	props: {
		x: {
			type: Number,
			required: true
		},
		y: {
			type: Number,
			required: true
		}
	},

	mounted() {
		this.$nextTick(() => {
			// const width = this.$el.offsetWidth;
			const width = (this.$el.offsetWidth ? this.$el.offsetWidth : 350);
			const height = this.$el.offsetHeight;

			let x = this.x;
			let y = this.y;

			if (x + width - window.pageXOffset > window.innerWidth) {
				x = window.innerWidth - width + window.pageXOffset;
			}

			if (y + height - window.pageYOffset > window.innerHeight) {
				y = window.innerHeight - height + window.pageYOffset;
			}

			if (this.$root.isMobile) {
				this.$el.style.left = (window.innerWidth / 2) - (width / 2) + 'px';
				this.$el.style.top = y + 40 + 'px';
			} else {
				this.$el.style.left = x + 'px';
				this.$el.style.top = y + 'px';
			}

			for (const el of Array.from(document.querySelectorAll('body *'))) {
				el.addEventListener('mousedown', this.onMousedown);
			}
		});
	},

	methods: {
		onMousedown(e) {
			if (!contains(this.$el, e.target) && (this.$el != e.target)) {
				e.preventDefault();
				this.close();
				return false;
			} else {
				return true;
			}
		},

		chosen(emoji) {
			this.$emit('chosen', emoji);
			this.close();
		},

		close() {
			for (const el of Array.from(document.querySelectorAll('body *'))) {
				el.removeEventListener('mousedown', this.onMousedown);
			}

			this.$emit('closed');
			this.destroyDom();
		}
	}
});
</script>

<style lang="stylus" scoped>
.gcafiosrssbtbnbzqupfmglvzgiaipyv
	position absolute
	top 0
	left 0
	z-index 30000
	box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.3)

</style>
