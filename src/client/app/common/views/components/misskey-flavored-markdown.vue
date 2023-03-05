<template>
<mfm-core v-bind="$attrs" class="havbbuyv" :class="{ nowrap: $attrs['nowrap'], sticker: !$attrs['no-sticker'] && $store.state.device.useSticker }" v-once/>
</template>

<script lang="ts">
import Vue from 'vue';
import MfmCore from './mfm';

export default Vue.extend({
	components: {
		MfmCore
	}
});
</script>

<style lang="stylus" scoped>
.havbbuyv
	white-space pre-wrap

	&.nowrap
		white-space pre
		word-wrap normal

	&:not(.nowrap).sticker
		:deep(.fvgwvorwhxigeolkkrcderjzcawqrscl:only-child)
			font-size 4em

	:deep(.quote)
		display block
		margin 8px
		padding 6px 0 6px 12px
		color var(--mfmQuote)
		border-left solid 3px var(--mfmQuoteLine)

</style>
