import { Input, Modal, DatePicker, Space, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createInvoiceThunk, updateInvoiceThunk } from "../redux/invoiceSlice";

import dayjs from "dayjs";
import { getCurrentYear } from "../util/functions";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function createItemToServer(
  itemPram: any,
  pathPram: string,
  dispatchPram: any
) {
  if (itemPram.key) {
    if (pathPram === "outgoing") {
      dispatchPram(updateInvoiceThunk(itemPram));
    }
  } else {
    if (pathPram === "outgoing") {
      dispatchPram(createInvoiceThunk(itemPram));
    }
  }
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type Props = {
  isModalOpen: boolean;
  onSave: () => void;
  onCancel: () => void;
  editData?: InvoiceType;
  path: string;
};

// const { RangePicker } = DatePicker;
interface InvoiceType {
  key?: string;
  name: string;
  startDate: Date | string;
  endDate: Date | string;
  amount: number;
  fileName?: string;
}

const initialItem = {
  name: "",
  startDate: getCurrentYear().startDate,
  endDate: getCurrentYear().endDate,
  amount: 0,
  fileName: "",
};

const FakturaModal = ({
  isModalOpen,
  onSave,
  onCancel,
  editData,
  path,
}: Props) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState<InvoiceType>(initialItem);

  const { RangePicker } = DatePicker;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);
  // const [uploading, setUploading] = useState(false);

  const onInputChange = (key: string, value: string | number) => {
    if (key === "amount") {
      value = +value;
    }
    const newItem = {
      ...item,
      [key]: value,
    };
    setItem(newItem);
  };

  const handleOk = () => {
    setItem(initialItem);
    if (!item?.name) {
      // setError({ ...error, title: "error" });
      console.log("Error");
    } else {
      onSave();
      if (uploadFileList.length > 0) {
        const formData = new FormData();
        uploadFileList.forEach((file) => {
          formData.append("file", file as FileType);
        });

        // setUploading(true);
        fetch("http://localhost:3000/upload", {
          method: "POST",
          body: formData,
        })
          .then((a) => a.json())
          .then((res) => {
            if (res.filename) {
              setFileList([]);
              message.success("upload successfully.");
              createItemToServer(
                { ...item, fileName: res.filename },
                path,
                dispatch
              );
              return res.filename;
            } else {
              throw new Error("File upload failed");
            }
          })
          .catch(() => {
            message.error("upload failed.");
          })
          .finally(() => {
            // setUploading(false);
          });
      } else {
        createItemToServer({ ...item, fileName: "" }, path, dispatch);
      }

      return true;
    }
    return false;
  };
  const handleCancel = () => {
    setItem(initialItem);
    onCancel();
  };

  const onChangeDate = (dates: any) => {
    const startDateStr = dates[0];
    const endDateStr = dates[1];
    const newItem = {
      ...item,
      ["startDate"]: startDateStr,
      ["endDate"]: endDateStr,
    };
    setItem(newItem);
  };

  useEffect(() => {
    console.log("EditItem1: ", editData);
    if (editData) {
      setItem(editData);
      if (editData.fileName) {
        setFileList([
          {
            uid: "-1",
            name: editData.fileName,
            status: "done",
            url: "http://localhost:3000/" + editData.fileName,
          },
        ]);
      }
    }
  }, [editData]);

  const beforeUploadFunc = () => {
    return false;
  };

  const props = {
    beforeUpload: beforeUploadFunc,
    multiple: false,
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setUploadFileList([]);
    },
    fileList,
  };

  const handleCancelImage = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({
    fileList: newfileList,
    file: newFile,
  }) => {
    if (newFile.status !== "removed") {
      setFileList(newfileList);
      setUploadFileList([newFile]);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Modal
      title="Create invoice"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Space direction="vertical">
        <Input
          key="name"
          placeholder="Name"
          value={item.name}
          required
          onChange={(e) => onInputChange("name", e.target.value)}
        />
        <RangePicker
          value={[dayjs(new Date()), dayjs(new Date())]}
          onChange={onChangeDate}
        />
        <Input
          key="amount"
          placeholder="Amount"
          value={item.amount}
          onChange={(e) => onInputChange("amount", e.target.value)}
        />
        <Upload
          {...props}
          maxCount={1}
          listType="picture-card"
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>

        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancelImage}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Space>
    </Modal>
  );
};

export default FakturaModal;
