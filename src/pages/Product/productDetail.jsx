import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LabelInfo, Loading, Modal, FormGroup } from "../../components";
import {
  selectedProduct,
  productEnableLoading,
} from "../../actions/product-action";
import { useDispatch, useSelector } from "react-redux";
// import { enableLoading } from "../../actions/user-actions";
// import { useHistory } from "react-router-dom";

const ProductDetial = () => {
  const { id } = useParams();
  const product = useSelector((state) => state.product.item);
  const loading = useSelector((state) => state.product.loading);
  const dispatch = useDispatch();
  // const history = useHistory();
  const [data, setData] = useState({
    name: "",
    _categories: "",
  });

  useEffect(() => {
    dispatch(productEnableLoading());
    dispatch(selectedProduct(id));
  }, [dispatch, id]);

  // console.log(product);

  // assign data to value
  const modelClick = () => {
    if (!loading) {
      setData(product);
    }
  };

  const onSaveChange = () => {
    // dispatch(updateSlectedUser(id, data));
  };

  console.log(product);

  return (
    <React.Fragment>
      <div className="card vh-100">
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-account"></i>
            </span>
            Product Detial{""}
          </h3>
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li
                className="breadcrumb-item breadcrumb-link"
                aria-current="page"
              >
                <Link to="/admin/product"> Products </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <span></span> Product detail{" "}
              </li>
            </ul>
          </nav>
        </div>
        {loading ? (
          Loading
        ) : (
          <>
            {product.images && (
              <div className="row justify-content-center">
                <div className="col-sm-4 p-3 text-center">
                  {product.images && (
                    <img
                      className="img-fluid"
                      style={{ width: "200px" }}
                      src={product.images[0].url}
                      alt=""
                    />
                  )}
                </div>
                <div className="col-sm-8">
                  <LabelInfo
                    label="id"
                    text={product._id ? product._id : "N/A"}
                  />
                  <LabelInfo
                    label="name"
                    text={product.name ? product.name : "N/A"}
                  />
                  <LabelInfo
                    label="brand"
                    text={product.brand.name ? product.brand.name : "N/A"}
                  />
                  <LabelInfo
                    label="categorie"
                    text={
                      product.categories[0] ? product.categories[0].name : "N/A"
                    }
                  />
                  {/* <LabelInfo label="image" text={product._images[0]} /> */}
                  <LabelInfo
                    label="create date"
                    text={product.create_date ? product.create_date : "N/A"}
                  />
                  <button
                    className="btn btn-info"
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => modelClick()}
                  >
                    Edit
                  </button>
                  <Modal
                    title="Edit Product Info"
                    buttonTitle="Save Change"
                    saveChange={(e) => onSaveChange()}
                  >
                    <form action="">
                      <div className="d-flex">
                        <div className="col-4 overflow-hidden my-3">
                          {product.images && (
                            <img
                              className="img-fluid"
                              src={product.images[0].url}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="align-self-end pb-2">
                          <label
                            className="btn btn-outline-primary"
                            htmlFor="user-choose-image"
                          >
                            Choose Image
                          </label>
                          <input
                            type="file"
                            id="user-choose-image"
                            className="d-none"
                          />
                        </div>
                      </div>
                      <FormGroup
                        onInputChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                        validation={data.name.length < 4}
                        label="Name"
                        value={data.name}
                      ></FormGroup>
                      <FormGroup
                        onInputChange={(e) =>
                          setData({ ...data, _categories: e.target.value })
                        }
                        validation={data._categories.length < 4}
                        label="Categories"
                        value={data._categories}
                      ></FormGroup>
                    </form>
                  </Modal>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </React.Fragment>
  );
};
export default ProductDetial;
