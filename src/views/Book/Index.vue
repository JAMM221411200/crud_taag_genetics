<template>
	<v-row>
		<v-col cols="12">
			<layout>
				<template #title>
					<div class="d-flex align-center">
						<v-icon class="display-1 mr-2"> mdi-book </v-icon>
						<h3>Libros</h3>
					</div>
				</template>

				<template #menu-options>
					<v-list-item @click="create()">
						<v-list-item-title> Crear </v-list-item-title>
					</v-list-item>
				</template>

				<template #subtitle> Listado de libros recientes. </template>

				<template #text>
					<v-row class="mt-2">
						<v-col cols="12">
							<v-text-field
								dense
								outlined
								clearable
								hide-details
								label="Criterio de busqueda"
								v-model="ui.filters.criterion"
							></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-data-table
								:items="books"
								:headers="ui.headers"
								:search="ui.filters.criterion"
							>
								<template v-slot:item._actions="{ item }">
									<v-menu offset-y>
										<template
											v-slot:activator="{ on, attrs }"
										>
											<v-btn
												fab
												x-small
												v-on="on"
												v-bind="attrs"
												elevation="1"
												color="default"
												:loading="item.ui.loading"
											>
												<v-icon>
													mdi-dots-vertical
												</v-icon>
											</v-btn>
										</template>
										<v-list>
											<v-list-item @click="edit(item)">
												<v-list-item-title>
													Editar
												</v-list-item-title>
											</v-list-item>

											<v-list-item @click="drop(item)">
												<v-list-item-title>
													Eliminar
												</v-list-item-title>
											</v-list-item>
										</v-list>
									</v-menu>
								</template>
							</v-data-table>
						</v-col>
					</v-row>
				</template>
			</layout>
		</v-col>

		<book-form></book-form>
	</v-row>
</template>

<script>
// VUEX
import { mapGetters } from "vuex";

// Utils
import { EventBus } from "@/main";

// Components
import Layout from "@/components/Layout";
import BookForm from "@/components/Book/Form";

// Class
import Book from "@/class/Book";

export default {
	name: "Index",

	components: {
		Layout,
		BookForm,
	},

	data() {
		return {
			ui: {
				headers: [
					{ text: "#", value: "id" },
					{ text: "Título", value: "title" },
					{ text: "Autor", value: "author" },
					{ text: "Materia", value: "matter" },
					{ text: "Edición", value: "edition" },
					{ text: "Proveedor", value: "provider" },
					{ text: "Típo de contenido", value: "content_type" },
					{ text: "Datos de publicacion", value: "publication_data" },
					{ text: "Acciones", value: "_actions" },
				],

				filters: {
					criterion: null,
				},

				loading: false,
			},
		};
	},

	methods: {
		create() {
			return EventBus.$emit("BookCreate");
		},

		edit(book) {
			return EventBus.$emit("BookEdit", Object.assign({}, book));
		},

		async drop(book) {
			try {
				if (confirm("¿Quiere eliminar el registro ahora?")) {
					book.ui.loading = true;

					await new Book(book).delete();

					this.$store.commit("REMOVE_BOOK", book.ui.index);
				}
			} catch (error) {
				alert(error);
			} finally {
				book.ui.loading = false;
			}
		},
	},

	computed: {
		...mapGetters({
			books: "AllBooks",
		}),
	},
};
</script>

<style lang="css" scoped></style>
