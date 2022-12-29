<template>
<div class="jtivnzhfwquxpsfidertopbmwmchmnmo">
	<p class="empty"><fa icon="exclamation-circle"/>this component has been abolished</p>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '../../../i18n';

export default Vue.extend({
	i18n: i18n('common/views/components/tag-cloud.vue')
});
</script>

<style lang="stylus" scoped>
.jtivnzhfwquxpsfidertopbmwmchmnmo

	> .empty
		margin 0
		padding 16px
		text-align center
		color var(--text)

		> [data-icon]
			margin-right 4px

</style>
