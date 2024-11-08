import { useEffect, useState } from "react";
import { Button, Space, Table, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import InvoiceModal from "./InvoiceModal";

import type { AppDispatch, RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { deleteInvoiceThunk, fetchInvoicesThunk } from "../redux/invoiceSlice";
import { API_URL, dateFormat } from "../util/functions";

export interface DataType {
  key: string;
  name: string;
  amount: number;
  startDate: Date | string;
  endDate: Date | string;
  fileName?: string;
}

const InvoiceTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allInvoices = useSelector((state: RootState) => state.invoice.invoices);
  const dispatch = useDispatch<AppDispatch>();
  const [localInvoices, setLocalInvoices] = useState<DataType[]>([]);
  const [editData, setEditData] = useState<DataType | undefined>();

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <a onClick={() => openItem(record)}>{text}</a>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, record) => record.amount + " kr",
    },
    {
      title: "Date",
      key: "Date",
      responsive: ["lg", "md"],
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => openItem(record)}>
            {dateFormat(record.startDate)} - {dateFormat(record.endDate)}
          </a>
        </Space>
      ),
    },
    {
      title: "Attachment",
      dataIndex: "fileName",
      key: "fileName",
      render: (_, record) =>
        record.fileName ? (
          <Image width={100} src={API_URL + record.fileName} />
        ) : (
          ""
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <a onClick={() => openItem(record)}>Edit</a>
          <a onClick={() => deleteItem(record)}>Delete</a> */}

          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => openItem(record)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteItem(record)}
          />
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
          fileName: item.fileName,
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
      <Table
        columns={columns}
        dataSource={localInvoices}
        scroll={{ x: "30vh" }}
      />
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={showModal}
      />
      <InvoiceModal
        isModalOpen={isModalOpen}
        onSave={onSave}
        path="outgoing"
        onCancel={handleCancel}
        editData={editData}
      />
    </>
  );
};

export default InvoiceTable;
