<template>
<x-container @remove="() => $emit('remove')" :draggable="true">
	<template #header><fa :icon="faAlignLeft"/> {{ $t('blocks.text') }}</template>

	<section class="ihymsbbe">
		<textarea v-model="value.text"></textarea>
	</section>
</x-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import i18n from '../../../../../i18n';
import XContainer from '../page-editor.container.vue';

export default Vue.extend({
	i18n: i18n('pages'),

	components: {
		XContainer
	},

	props: {
		value: {
			required: true
		},
	},

	data() {
		return {
			faAlignLeft,
		};
	},

	created() {
		if (this.value.text == null) Vue.set(this.value, 'text', '');
	},
});
</script>

<style lang="stylus" scoped>
.ihymsbbe
	> textarea
		display block
		appearance none
		width 100%
		min-width 100%
		min-height 150px
		border none
		box-shadow none
		padding 16px
		background transparent
		color var(--text)
		font-size 14px
</style>
