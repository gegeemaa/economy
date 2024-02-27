import { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import FakturaModal from "./FakturaModal";

import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteInvoiceThunk,
  fetchInvoicesThunk,
} from "../redux/incomingInvoiceSlice";
import { dateFormat } from "../util/functions";

interface DataType {
  key: string;
  name: string;
  amount: number;
  startDate: Date | string;
  endDate: Date | string;
  image?: string;
}

const IncomingFakturaTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allInvoices = useSelector(
    (state: RootState) => state.incomingInvoice.invoices
  );
  const dispatch = useDispatch();
  const [localInvoices, setLocalInvoices] = useState<DataType[]>([]);
  const [editData, setEditData] = useState<DataType | undefined>();

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      key: "Date",
      render: (_, record) => (
        <Space size="middle">
          <a>
            {dateFormat(record.startDate)} - {dateFormat(record.endDate)}
          </a>
        </Space>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => openItem(record)}>Edit</a>
          <a onClick={() => deleteItem(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchInvoicesThunk());
  }, []);

  useEffect(() => {
    if (allInvoices) {
      const invoicesFormated = allInvoices.map((item) => {
        return {
          key: item.id,
          name: item.name,
          amount: item.amount,
          startDate: item.startDate,
          endDate: item.endDate,
          image: item.fileName,
        };
      });
      setLocalInvoices(invoicesFormated);
    }
  }, [allInvoices]);

  const openItem = (record: DataType) => {
    setIsModalOpen(true);
    setEditData(record);
  };

  const deleteItem = (record: DataType) => {
    dispatch(deleteInvoiceThunk(record));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onSave = () => {
    setIsModalOpen(false);
    setEditData(undefined);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditData(undefined);
  };
  return (
    <>
      <Table columns={columns} dataSource={localInvoices} />
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={showModal}
      />
      <FakturaModal
        isModalOpen={isModalOpen}
        onSave={onSave}
        onCancel={handleCancel}
        path="incoming"
        editData={editData}
      />
    </>
  );
};

export default IncomingFakturaTable;
