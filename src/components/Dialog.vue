<template>
	<v-dialog persistent max-width="750" v-model="show">
		<v-card class="pa-4 pt-0" :disabled="loading" :loading="loading">
			<v-card-title>
				<slot name="title"></slot>
			</v-card-title>

			<v-card-subtitle>
				<slot name="subtitle"></slot>
			</v-card-subtitle>

			<v-card-text>
				<slot name="text"></slot>
			</v-card-text>

			<v-card-actions class="d-flex justify-end">
				<slot name="actions"></slot>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
		},

		loading: {
			required: false,
			default: false,
			type: Boolean,
		},
	},

	data() {
		return {};
	},

	computed: {
		show: {
			get() {
				return this.value;
			},

			set(newValue) {
				this.$emit("input", newValue);
			},
		},
	},
};
</script>

<style lang="css" scoped></style>
