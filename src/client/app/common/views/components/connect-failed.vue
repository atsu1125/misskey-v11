<template>
<div class="mk-connect-failed">
	<h1>{{ $t('title') }}</h1>
	<p class="text">
		<span>{{ this.$t('description').substring(0, this.$t('description').indexOf('{')) }}</span>
		<a @click="reload">{{ this.$t('description').match(/\{(.+?)\}/)[1] }}</a>
		<span>{{ this.$t('description').substring(this.$t('description').indexOf('}') + 1) }}</span>
	</p>
	<button v-if="!troubleshooting" @click="troubleshooting = true">{{ $t('troubleshoot') }}</button>
	<x-troubleshooter v-if="troubleshooting"/>
	<p class="tools">
		<a @click="onFlush">{{ $t('@.flush') }}</a>
		<!-- <a href="/assets/flush.html">{{ $t('flush') }}</a> -->
		<a href="/assets/version.html">{{ $t('set-version') }}</a>
	</p>
	<p class="thanks">{{ $t('thanks') }}</p>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '../../../i18n';
import XTroubleshooter from './connect-failed.troubleshooter.vue';

export default Vue.extend({
	i18n: i18n('common/views/components/connect-failed.vue'),
	components: {
		XTroubleshooter
	},
	data() {
		return {
			troubleshooting: false
		};
	},
	mounted() {
		document.title = 'Oops!';
		document.documentElement.style.setProperty('background', '#f8f8f8', 'important');
	},
	methods: {
		reload() {
			location.reload(true);
		},

		onFlush() {
			const r = confirm(this.$t('flush-are-you-sure'));
			if (r) location.href = '/flush';
		}
	}
});
</script>

<style lang="stylus" scoped>


.mk-connect-failed
	width 100%
	padding 32px 18px
	text-align center

	> h1
		display block
		margin 1.25em auto 0.65em auto
		font-size 1.5em
		color #555

	> .text
		display block
		margin 0 auto
		max-width 600px
		font-size 1em
		color #666

	> button
		display block
		margin 1em auto
		padding 8px 10px
		color var(--primaryForeground)
		background var(--primary)

		&:focus
			outline solid 3px var(--primaryAlpha03)

		&:hover
			background var(--primaryLighten10)

		&:active
			background var(--primaryDarken10)

	> .tools
		display block
		margin 0 auto
		max-width 600px
		font-size 1em

		> a
			margin 0 4px

	> .thanks
		display block
		margin 2em auto 0 auto
		padding 2em 0 0 0
		max-width 600px
		font-size 0.9em
		font-style oblique
		color #aaa
		border-top solid 1px #eee

</style>

