import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InvoiceType {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  amount: number;
  fileName?: string;
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

const invoiceSlice = createSlice({
  name: "allInvoices",
  initialState,
  reducers: {
    // fetchInvoices: (state: InvoiceState, action: PayloadAction<any>) => {
    //   const { data } = action.payload;
    //   state.invoices = data as InvoiceType[];
    // },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchInvoicesThunk.fulfilled, (state, action) => {
      state.invoices = action.payload;
    });
    builder.addCase(createInvoiceThunk.fulfilled, (state, action) => {
      state.invoices.push(action.payload);
    });
    builder.addCase(updateInvoiceThunk.fulfilled, (state, action) => {
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
  "invoices/fetchAllInvoice",
  async (thunkAPI) => {
    const response = await fetch("http://localhost:3000/invoices", {
      method: "GET",
    });
    const data = response.json();
    return data;
  }
);

export const createInvoiceThunk = createAsyncThunk(
  "invoice/create",
  async (body, thunkAPI) => {
    const { name, startDate, endDate, amount, fileName } = body;

    const response = await fetch("http://localhost:3000/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        startDate,
        endDate,
        amount,
        fileName,
      }),
    });
    const data = response.json();
    return data;
  }
);

export const updateInvoiceThunk = createAsyncThunk(
  "invoice/update",
  async (body, thunkAPI) => {
    const { key, name, startDate, endDate, amount, fileName } = body;
    const response = await fetch("http://localhost:3000/updateInvoice/" + key, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        startDate,
        endDate,
        amount,
        fileName,
      }),
    });
    const data = response.json();
    return data;
  }
);

export const deleteInvoiceThunk = createAsyncThunk(
  "invoice/delete",
  async (body, thunkAPI) => {
    const { key } = body;

    const response = await fetch("http://localhost:3000/invoice/" + key, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    return data;
  }
);

export const { fetchInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;
