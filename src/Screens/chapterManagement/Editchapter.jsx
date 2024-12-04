import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import { Editbook, GetBookdetail } from '../../api'
import CustomButton from "../../Components/CustomButton";
export const EditChapter  = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    const [categories, setCategories] = useState({});
    const [unit, setUnit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        cover: '', // Initialize image as an empty string
    });

    const Booktype = [
        {
            key: "0",
            name: "eBook",
        },
        {
            key: "0",
            name: "AudioBook",
        },]

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };

    const filehandleChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const fileName = file;
            setFormData((prevData) => ({
                ...prevData,
                cover: fileName,
            }));
        }
        console.log(formData)
    };



    const bookdetail = async () => {
        try {
            const response = await GetBookdetail(id)
            console.log("response", response)


            setFormData(response?.data)

        } catch (error) {
            console.error("Error in logging in:", error);

            // toastAlert(error, ALERT_TYPES.ERROR);
        }
    };

    useEffect(() => {
        bookdetail()
    }, [id])


    const handleSubmit = async (event) => {
        event.preventDefault();

        // document.querySelector('.loaderBox').classList.remove("d-none");
        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);

        }

        formDataMethod.append("id", id);

        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request

        try {
            const response = await Editbook(formDataMethod);

            if (response?.status == true) {
                navigate('/book-management');

            } else {

            }
        } catch (error) {
            console.error("Error in adding model post:", error);
        }
    };



    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Edit   Book
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label="Author Name                          "
                                                    required
                                                    id="name"
                                                    type="text"
                                                    placeholder="Enter author Name"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="author"
                                                    value={formData.author}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label="Title"
                                                    required
                                                    id="jobID"
                                                    type="text"
                                                    placeholder="Enter Title"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">

                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="type"
                                                    label="Select Book Type"
                                                    placeholder="Select Book Type"
                                                    required
                                                    value={formData.type}
                                                    option={Booktype}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label="Enter Book Language

                          "
                                                    required
                                                    id="info"
                                                    type="text"
                                                    placeholder="Enter Book Language

                          "
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="lang"
                                                    value={formData.lang}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label="Book Cover    "
                                                    required
                                                    id="resume"
                                                    type="file"
                                                    placeholder="Book Cover"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="cover"
                                                    // value={formData.cover}
                                                    onChange={filehandleChange}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label="Enter Audiobook Duration  "
                                                    required
                                                    id="schedule_interview"
                                                    type="text"
                                                    placeholder="   Enter Audiobook Duration"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="audiobook_duration"
                                                    value={formData.audiobook_duration}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label="Enter Pages  "
                                                    required
                                                    id="schedule_interview"
                                                    type="text"
                                                    placeholder="   Enter Pages"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="pages"
                                                    value={formData.pages}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label="Enter Book Rating  "
                                                    required
                                                    id="schedule_interview"
                                                    type="text"
                                                    placeholder="   Enter Book Rating"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="rating"
                                                    value={formData.rating}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                {/* <CustomInput
                                                    label="Description"
                                                    required
                                                    id="dateTime"
                                                    type="text"
                                                    placeholder="Description"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                /> */}
                                                <div className="inputWrapper">
                                                    <div className="form-controls">
                                                        <label htmlFor="">Description</label>
                                                        <textarea
                                                            name="description"
                                                            className="form-control shadow border-0"
                                                            id="description"
                                                            cols="30"
                                                            rows="10"
                                                            value={formData?.description}
                                                            onChange={handleChange}
                                                        ></textarea>
                                                    </div>
                                                </div>

                                            </div>


                                            <div className="col-md-12">
                                                <CustomButton
                                                    variant="primaryButton"
                                                    text="Submit"
                                                    type="submit"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <CustomModal
                    show={showModal}
                    close={() => {
                        setShowModal(false);
                    }}
                    success
                    heading="Book added Successfully."
                />
            </DashboardLayout>
        </>
    );
};

