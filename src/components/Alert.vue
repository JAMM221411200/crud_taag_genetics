<template>
	<v-dialog v-model="alert.show" persistent width="600">
		<v-card class="pa-4">
			<v-card-title>{{ alert.title }}</v-card-title>

			<v-card-subtitle>{{ alert.subtitle }}</v-card-subtitle>

			<v-card-text class="pb-0">
				<v-row>
					<v-col cols="12" v-if="alert.message">
						{{ alert.message }}
					</v-col>
					<v-col cols="12" class="d-flex flex-column">
						<span
							v-for="(error, index) in alert.errors"
							:key="`error-${index}`"
						>
							{{ error }}
						</span>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions class="d-flex justify-end">
				<v-btn color="primary" @click="alert.show = false"> Ok </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { EventBus } from "@/main";

export default {
	name: "Alert",

	data() {
		return {
			alert: { title: null, message: null, show: false, redirect: null },
		};
	},

	created() {
		EventBus.$on("Error", (data) => {
			let message = null;

			let errors = [];

			let title = "Error";

			let subtitle = null;

			data.alertShow = data.alertShow ?? false;

			data.show_error_messages = data.show_error_messages ?? false;

			if (data.error.response) {
				let response_data = data.error.response.data;

				if (response_data.errors) {
					if (data.show_error_messages) {
						title = response_data.message;
						subtitle = data.error.message;
						errors = this.errorsArrayEncode(response_data.errors);
					}
				} else {
					message = response_data.message;
					subtitle = response_data.statusText;
					title = data.error.message;
				}
			} else {
				title = data.error;
				subtitle = data?.subtitle ?? null;
				message = data?.message ?? null;
			}

			if (data.alertShow || data.show_error_messages) {
				this.alert = {
					title: title,
					subtitle: subtitle,
					message: message,
					errors: errors,
					show: true,
				};
			}
		});
	},

	methods: {
		errorsArrayEncode(errors) {
			var array = [];

			for (var campo in errors) {
				errors[campo].forEach((error, key) => {
					array.push(`${errors[campo][key]}`);
				});
			}

			return array;
		},
	},
};
</script>

<style lang="css" scoped></style>
