import apiMain from "@/utils/axios/api-main";

export default class Book {
	constructor(book = {}) {
		this.book = book;
	}

	async index() {
		try {
			let response = await apiMain.get(`/book`);

			return response.data.data;
		} catch (error) {
			throw error;
		}
	}

	async store() {
		try {
			let response = await apiMain.post(`/book`, this.book);

			return response.data.data;
		} catch (error) {
			throw error;
		}
	}

	async update() {
		try {
			if (!this.book?.id) throw new Error("book id required.");

			let response = await apiMain.put(
				`/book/${this.book.id}`,
				this.book
			);

			return response.data.data;
		} catch (error) {
			throw error;
		}
	}

	async delete() {
		try {
			if (!this.book?.id) throw new Error("book id required.");

			let response = await apiMain.delete(`/book/${this.book.id}`);

			return response.data.data;
		} catch (error) {
			throw error;
		}
	}
}
