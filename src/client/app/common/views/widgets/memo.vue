<template>
<div class="mkw-memo">
	<ui-container :show-header="!props.compact">
		<template #header><fa :icon="['far', 'sticky-note']"/>{{ $t('title') }}</template>

		<div class="mkw-memo--body">
			<textarea v-model="text" :placeholder="$t('placeholder')" @input="onChange"></textarea>
		</div>
	</ui-container>
</div>
</template>

<script lang="ts">
import define from '../../define-widget';
import i18n from '../../../i18n';

export default define({
	name: 'memo',
	props: () => ({
		compact: false,
		memo: ''
	})
}).extend({
	i18n: i18n('common/views/widgets/memo.vue'),

	created() {
		if (this.text === null) {
			this.text = this.$store.state.settings.memo;
		}
	},

	computed: {
		text: {
			get() { return this.props.memo; },
			set(value: string) {
				this.props.memo = value;
				this.save();
			}
		}
	},

	methods: {
		func() {
			this.props.compact = !this.props.compact;
			this.save();
		}
	}
});
</script>

<style lang="stylus" scoped>
.mkw-memo
	.mkw-memo--body
		> textarea
			display block
			width 100%
			max-width 100%
			min-width 100%
			padding 16px
			color var(--inputText)
			background var(--face)
			border none
			border-bottom solid var(--lineWidth) var(--faceDivider)
			border-radius 0
</style>
