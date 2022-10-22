<template>
	<v-card>
		<v-card-title class="d-flex justify-space-between">
			<div class="d-flex align-center">
				<slot name="title"></slot>
			</div>

			<v-menu offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						fab
						v-on="on"
						v-bind="attrs"
						elevation="2"
						color="default"
					>
						<v-icon> mdi-dots-vertical </v-icon>
					</v-btn>
				</template>
				<v-list>
					<slot name="menu-options" />

					<!-- Option Example -->

					<!-- <v-list-item
						@click="
							$router.push({
								name: 'CollaboratorCreate',
							})
						"
					>
						<v-list-item-title> Nuevo </v-list-item-title>
					</v-list-item> -->
				</v-list>
			</v-menu>
		</v-card-title>
		<v-card-subtitle>
			<slot name="subtitle"></slot>
		</v-card-subtitle>

		<v-card-text>
			<slot name="text"></slot>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	data() {
		return {};
	},
};
</script>

<style lang="css" scoped></style>
