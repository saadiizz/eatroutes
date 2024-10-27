import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import deleteIcon from "@assets/images/delete.png";
import "./style.css";

const Preview = (props) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [dragId, setDragId] = useState("");
  const { formik } = props;

  const setImageToFileReader = () => {
    const files = formik?.values?.products_gallery;
    setPreviewImages([]);
    Promise.all(
      files.map((file, index) => {
        return new Promise((resolve, reject) => {
          const type = typeof file;
          if (type === "string") {
            const result = {
              file: file,
              name: file?.split("/").reverse()[0],
              id: index,
            };
            resolve(result);
          } else {
            const reader = new FileReader();
            reader.onloadend = () => {
              const result = {
                file: reader.result,
                name: file.name,
                id: index,
              };
              resolve(result);
            };
            reader.readAsDataURL(file);
          }
        });
      })
    ).then((arr) => setPreviewImages(arr));
  };

  useEffect(() => {
    setImageToFileReader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik?.values?.products_gallery]);

  const handleOver = (ev) => {
    ev.preventDefault();
  };

  const handleDrag = (ev) => {
    setDragId(parseInt(ev.currentTarget.id));
  };

  const handleDrop = (ev) => {
    ev.preventDefault();
    const dragImage = previewImages.find((image) => image.id === dragId);
    const dropImage = previewImages.find(
      (image) => image.id === parseInt(ev.currentTarget.id)
    );
    const arr = moveItem(dragImage.id, dropImage.id);
    formik.setFieldValue("products_gallery", arr);
  };

  const deleteImage = (id) => {
    if (previewImages.length > 0) {
      let formikProductGallary = formik?.values?.products_gallery.filter(
        (image, index) => index !== id
      );
      formik.setFieldValue("products_gallery", formikProductGallary);
    }
  };

  const moveItem = (from, to) => {
    const tempImages = [...formik?.values?.products_gallery];
    const f = tempImages.splice(from, 1)[0];
    tempImages.splice(to, 0, f);
    return tempImages;
  };
  return (
    <div className="wrapper">
      {previewImages?.length > 0 &&
        previewImages?.map((element, index) => {
          return (
            <div
              className="gallery"
              key={index}
              id={element.id}
              draggable
              onDragOver={(e) => handleOver(e)}
              onDragStart={(e) => handleDrag(e)}
              onDrop={(e) => handleDrop(e)}
            >
              <img src={element?.file} alt={element?.name} />

              <div className="desc">
                <div className="image-order">
                  <Link
                    to=""
                    title="Delete Image"
                    onClick={() => deleteImage(element.id)}
                  >
                    <img src={deleteIcon} alt="delete icon" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Preview;
