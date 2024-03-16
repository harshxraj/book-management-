import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Layout, Menu, theme } from "antd";
import { Modal, Space, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { toast } from "react-hot-toast";
import { CREATE_COURSE } from "../../graphql/mutations/course.mutation";
import { useMutation } from "@apollo/client";
import { addBook } from "../../redux/user.slice";
import { ADD_BOOK } from "../../graphql/mutations/book.mutation";
import { useDispatch } from "react-redux";

const { TextArea } = Input;

const AddCourse = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const dispatch = useDispatch();
  const role = "admin";
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [addBook, { loading, error }] = useMutation(ADD_BOOK);

  const optionsArr = [
    { value: "Mystery", label: "Mystery" },
    { value: "Science Fiction", label: "Science Fiction" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Romance", label: "Romance" },
    { value: "Thriller", label: "Thriller" },
    { value: "Horror", label: "Horror" },
    { value: "Historical Fiction", label: "Historical Fiction" },
    { value: "Biography", label: "Biography" },
    { value: "Self-Help", label: "Self-Help" },
    { value: "Dystopian", label: "Dystopian" },
    { value: "Adventure", label: "Adventure" },
    { value: "Crime", label: "Crime" },
    { value: "Poetry", label: "Poetry" },
    { value: "Graphic Novel", label: "Graphic Novel" },
    { value: "Humor", label: "Humor" },
    { value: "Travel", label: "Travel" },
    { value: "Cookbooks", label: "Cookbooks" },
    { value: "Science", label: "Science" },
  ];

  const [bookState, setbookState] = useState({
    title: "",
    description: "",
    author: "",
    genre: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setbookState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    if (
      !bookState.title ||
      !bookState.description ||
      !bookState.author ||
      !bookState.image
    ) {
      return toast.error("Fill all the fields");
    }
    setConfirmLoading(true);
    console.log(bookState);
    try {
      const input = {
        title: bookState.title,
        description: bookState.description,
        author: bookState.author,
        genre: bookState.genre,
        image: bookState.image,
      };

      const { data } = await addBook({
        variables: {
          input: input,
        },
      });
      setOpen(false);
      setConfirmLoading(false);
      const newBook = await data.addBook;
      console.log("NEWBOOK", newBook);
      window.location.reload();

      // dispatch(addBook(newBook));
    } catch (error) {
      setConfirmLoading(false);
      console.error("Error creating book:", error);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onGenreChange = (value) => {
    setbookState((prev) => ({ ...prev, genre: value }));
  };

  return (
    <div>
      {role == "admin" && (
        <div className="">
          <Button
            className="bg-sky-600 flex items-center"
            type="primary"
            onClick={showModal}
          >
            <FaPlus className="mr-2" />
            Add a book
          </Button>
          <Modal
            title="Add a course"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width={600}
            okButtonProps={{
              style: { backgroundColor: "#1890ff", borderColor: "#1890ff" },
            }}
          >
            <>
              <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                disabled={componentDisabled}
                style={{
                  maxWidth: 600,
                }}
              >
                <Form.Item label="Book Title">
                  <Input
                    name="title"
                    value={bookState.title}
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item label="Author">
                  <Input
                    name="author"
                    value={bookState.author}
                    onChange={handleChange}
                    placeholder=""
                  />
                </Form.Item>

                <Form.Item label="Genre">
                  <Select
                    defaultValue="Genre"
                    style={{
                      width: 120,
                    }}
                    name="course_code"
                    onChange={onGenreChange}
                    options={optionsArr}
                  />
                </Form.Item>

                <Form.Item label="Description">
                  <TextArea
                    name="description"
                    value={bookState.description}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Image Link">
                  <Input
                    name="image"
                    value={bookState.image}
                    onChange={handleChange}
                    placeholder=""
                  />
                </Form.Item>
              </Form>
            </>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
