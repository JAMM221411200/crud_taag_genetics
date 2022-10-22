import Vue from "vue";
import Vuex from "vuex";

// Class
import Book from "@/class/Book";

// Utils
import { EventBus } from "@/main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
  },

  getters: {
    AllBooks: (state) =>
      state.books.map((book, index) => ({
        ...book,
        ui: { loading: false, index },
      })),
  },

  mutations: {
    SET_BOOKS: (state, books) => {
      state.books = books;
    },

    SET_BOOK: (state, item) => {
      state.books = [item, ...state.books];
    },

    UPDATE_BOOK: (state, { index, item }) => {
      let books = state.books;

      books.splice(index, 1, item);

      state.books = books;
    },

    REMOVE_BOOK: (state, index) => {
      let books = state.books;

      books.splice(index, 1);

      state.books = books;
    },
  },

  actions: {
    async bookIndex(context) {
      try {
        context.commit("SET_BOOKS", await new Book().index());
      } catch (error) {
        console.error(error);

        EventBus.$emit("Error", {
          error: error,
          show_error_messages: true,
        });
      }
    },
  },

  modules: {},
});
