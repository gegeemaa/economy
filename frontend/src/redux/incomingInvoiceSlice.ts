import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InvoiceType {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  amount: number;
}

export type InvoiceState = {
  invoices: InvoiceType[];
};

const initialState: InvoiceState = {
  invoices: [
    // {
    //   key: "1",
    //   name: "Hello1",
    //   startDate: "2023-03-01T00:00:00.000Z",
    //   endDate: "2023-03-31T00:00:00.000Z",
    //   amount: 3000,
    // },
  ],
};

const incomingInvoiceSlice = createSlice({
  name: "allInvoices",
  initialState,
  reducers: {
    fetchInvoices: (state: InvoiceState, action: PayloadAction<any>) => {
      const { data } = action.payload;
      state.invoices = data as InvoiceType[];
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchInvoicesThunk.fulfilled, (state, action) => {
      state.invoices = action.payload;
    });
    builder.addCase(createIncomingInvoiceThunk.fulfilled, (state, action) => {
      state.invoices.push(action.payload);
    });
    builder.addCase(updateIncomingInvoiceThunk.fulfilled, (state, action) => {
      const updateItem = action.payload;
      const index = state.invoices.findIndex(
        (item) => item.id === updateItem.id
      );
      if (index !== -1) {
        state.invoices[index] = updateItem;
      }
    });
    builder.addCase(deleteInvoiceThunk.fulfilled, (state, action) => {
      state.invoices = state.invoices.filter(
        (item) => item.id != action.payload.id
      );
    });
  },
});

// First, create the thunk
export const fetchInvoicesThunk = createAsyncThunk(
  "incomingInvoices/fetchAllInvoice",
  async (thunkAPI) => {
    const response = await fetch("http://localhost:3000/incomingInvoices", {
      method: "GET",
    });
    const data = response.json();
    return data;
  }
);

export const createIncomingInvoiceThunk = createAsyncThunk(
  "incomingInvoice/create",
  async (body, thunkAPI) => {
    const { name, startDate, endDate, amount } = body;
    const response = await fetch("http://localhost:3000/incomingInvoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        startDate,
        endDate,
        amount,
      }),
    });
    const data = response.json();
    return data;
  }
);

export const updateIncomingInvoiceThunk = createAsyncThunk(
  "incomingInvoice/update",
  async (body, thunkAPI) => {
    const { key, name, startDate, endDate, amount } = body;
    const response = await fetch(
      "http://localhost:3000/updateIncomingInvoice/" + key,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          startDate,
          endDate,
          amount,
        }),
      }
    );
    const data = response.json();
    return data;
  }
);

export const deleteInvoiceThunk = createAsyncThunk(
  "incomingInvoice/delete",
  async (body, thunkAPI) => {
    const { key } = body;

    const response = await fetch(
      "http://localhost:3000/incomingInvoice/" + key,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.json();
    return data;
  }
);

export const { fetchInvoices } = incomingInvoiceSlice.actions;
export default incomingInvoiceSlice.reducer;
