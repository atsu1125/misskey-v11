<template>
<div class="mkw-hashtags">
	<ui-container :show-header="!props.compact">
		<template #header><fa icon="hashtag"/>{{ $t('title') }}</template>

		<div class="mkw-hashtags--body">
			<p class="empty"><fa icon="exclamation-circle"/>this widget has been abolished</p>
		</div>
	</ui-container>
</div>
</template>

<script lang="ts">
import define from '../../../common/define-widget';
import i18n from '../../../i18n';

export default define({
	name: 'hashtags',
	props: () => ({
		compact: false
	})
}).extend({
	i18n: i18n('common/views/widgets/hashtags.vue')
});
</script>

<style lang="stylus" scoped>
.mkw-hashtags
	.mkw-hashtags--body
		> .empty
			margin 0
			padding 16px
			text-align center
			color var(--text)

			> [data-icon]
				margin-right 4px

</style>
