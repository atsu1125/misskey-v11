<template>
<div>
	<ui-card>
		<template #title><fa :icon="faBroadcastTower"/> {{ $t('announcements') }}</template>
		<section v-for="(announcement, i) in announcements" class="fit-top">
			<ui-input v-model="announcement.title" @change="save">
				<span>{{ $t('title') }}</span>
			</ui-input>
			<ui-textarea v-model="announcement.text">
				<span>{{ $t('text') }}</span>
			</ui-textarea>
			<ui-input v-model="announcement.image">
				<span>{{ $t('image-url') }}</span>
			</ui-input>
			<ui-horizon-group class="fit-bottom">
				<ui-button @click="save()" :disabled="!$store.getters.isAdmin"><fa :icon="['far', 'save']"/> {{ $t('save') }}</ui-button>
				<ui-button @click="remove(i)" :disabled="!$store.getters.isAdmin"><fa :icon="['far', 'trash-alt']"/> {{ $t('remove') }}</ui-button>
			</ui-horizon-group>
		</section>
		<section>
			<ui-button @click="add" :disabled="!$store.getters.isAdmin"><fa :icon="faPlus"/> {{ $t('add') }}</ui-button>
		</section>
	</ui-card>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '../../i18n';
import { faBroadcastTower, faPlus } from '@fortawesome/free-solid-svg-icons';

export default Vue.extend({
	i18n: i18n('admin/views/announcements.vue'),
	data() {
		return {
			announcements: [],
			faBroadcastTower, faPlus
		};
	},

	created() {
		this.$root.getMeta().then(meta => {
			this.announcements = meta.announcements;
		});
	},

	methods: {
		add() {
			this.announcements.unshift({
				title: '',
				text: '',
				image: null
			});
		},

		remove(i) {
			this.$root.dialog({
				type: 'warning',
				text: this.$t('_remove.are-you-sure').replace('$1', this.announcements.find((_, j) => j == i).title),
				showCancelButton: true
			}).then(({ canceled }) => {
				if (canceled) return;
				this.announcements = this.announcements.filter((_, j) => j !== i);
				this.save(true);
				this.$root.dialog({
					type: 'success',
					text: this.$t('_remove.removed')
				});
			});
		},

		save(silent) {
			this.$root.api('admin/update-meta', {
				announcements: this.announcements
			}).then(() => {
				if (!silent) {
					this.$root.dialog({
						type: 'success',
						text: this.$t('saved')
					});
				}
			}).catch(e => {
				this.$root.dialog({
					type: 'error',
					text: e
				});
			});
		}
	}
});
</script>
