<template>
	<Dialog v-model="ui.show" :loading="ui.loading">
		<template #title>
			{{ ui.action_type == "create" ? `Crear libro` : `Editar libro` }}
		</template>

		<template #subtitle>
			{{
				`Complete el formulario para ${
					ui.action_type == "create" ? "crear" : "editar"
				} el registro.`
			}}
		</template>

		<template #text>
			<v-form
				ref="form"
				lazy-validation
				v-model="ui.valid"
				@submit.prevent="send()"
			>
				<v-row>
					<v-col cols="12" md="6" class="pb-0">
						<v-text-field
							dense
							counter
							outlined
							clearable
							label="Título"
							v-model="form_layout.title"
							:rules="[v.required]"
						></v-text-field>
					</v-col>
					<v-col cols="12" md="6" class="pb-0">
						<v-text-field
							dense
							counter
							outlined
							clearable
							label="Autor"
							v-model="form_layout.author"
							:rules="[v.required]"
						></v-text-field>
					</v-col>
					<v-col cols="12" md="6" class="pb-0">
						<v-text-field
							dense
							counter
							outlined
							clearable
							label="Materia"
							v-model="form_layout.matter"
							:rules="[v.required]"
						></v-text-field>
					</v-col>
					<v-col cols="12" md="6" class="pb-0">
						<v-text-field
							dense
							counter
							outlined
							clearable
							label="Edición"
							v-model="form_layout.edition"
							:rules="[v.required]"
						></v-text-field>
					</v-col>
					<v-col cols="12" md="6" class="pb-0">
						<v-text-field
							dense
							counter
							outlined
							clearable
							label="Proveedor"
							v-model="form_layout.provider"
							:rules="[v.required]"
						></v-text-field>
					</v-col>
					<v-col cols="12" md="6" class="pb-0">
						<v-text-field
							dense
							counter
							outlined
							clearable
							label="Típo de contenido"
							v-model="form_layout.content_type"
							:rules="[v.required]"
						></v-text-field>
					</v-col>
					<v-col cols="12" class="pb-0">
						<v-textarea
							dense
							counter
							outlined
							clearable
							label="Datos de publicacion"
							v-model="form_layout.publication_data"
							:rules="[v.required]"
						></v-textarea>
					</v-col>
				</v-row>
			</v-form>
		</template>

		<template #actions>
			<v-btn text color="primary" :disabled="ui.loading" @click="close()">
				Cancelar
			</v-btn>
			<v-btn
				color="primary"
				@click="send()"
				:loading="ui.loading"
				:disabled="!ui.valid"
			>
				Enviar
			</v-btn>
		</template>
	</Dialog>
</template>

<script>
// Utils
import { EventBus } from "@/main";
import Validations from "@/utils/validations";

// Components
import Dialog from "@/components/Dialog";

// Class
import Book from "@/class/Book";

export default {
	components: { Dialog },

	data() {
		return {
			v: Validations,

			data: {
				book: null,
			},

			form_layout: {
				title: null,
				author: null,
				matter: null,
				edition: null,
				provider: null,
				content_type: null,
				publication_data: null,
			},

			ui: {
				valid: true,
				show: false,
				loading: false,
				action_type: "create",
			},
		};
	},

	created() {
		EventBus.$on("BookCreate", () => {
			this.ui.action_type = "create";

			this.ui.show = true;
		});

		EventBus.$on("BookEdit", (book) => {
			this.ui.action_type = "edit";

			this.data.book = book;

			this.form_layout = book;

			this.ui.show = true;
		});
	},

	methods: {
		async send() {
			try {
				this.ui.loading = true;

				if (this.$refs.form.validate()) {
					let book = new Book(this.form_layout);

					if (this.ui.action_type == "create") {
						let book_stored = await book.store();

						this.$store.commit("SET_BOOK", book_stored);
					} else {
						let book_updated = await book.update();

						this.$store.commit("UPDATE_BOOK", {
							index: this.data.book.ui.index,
							item: book_updated,
						});
					}

					this.close();
				}
			} catch (error) {
				EventBus.$emit("Error", {
					error: error,
					show_error_messages: true,
				});
			} finally {
				this.ui.loading = false;
			}
		},

		close() {
			this.ui.show = false;

			this.data.book = null;

			this.$refs.form.reset();
		},
	},
};
</script>

<style lang="css" scoped></style>
