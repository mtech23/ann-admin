import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import { GetBookdetail , Getchaptersdetail , Addchapter } from '../../api'

export const ChapterDetails = () => {

  const { id } = useParams();
  const [formData, setFormData] = useState({});

  const base_url = process.env.REACT_APP_BASE_URL
  const [Bookdetail, setBookdetail] = useState({});
  const [isChapter, setIsChapter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [message, setMessage] = useState(false)


  const inActive = () => {
    setShowModal(false)
    setShowModal2(true)
  }
  const Active = () => {
    setShowModal3(false)
    setShowModal4(true)
  }
  console.log("id", id)

  const bookdetail = async () => {
    try {
      const response = await GetBookdetail(id)
      console.log("response", response)


      setBookdetail(response?.data)

    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
  };











  const chapterData = async () => {
    try {
      const response = await GetBookdetail(id)
      console.log("response", response)


      setBookdetail(response?.data)

    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
  };






  useEffect(() => {
    bookdetail()
  }, [id])
  

  const AddchapterSubmit = async (event) => {
    event.preventDefault();

    document.querySelector('.loaderBox').classList.remove("d-none");
    const formDataMethod = new FormData();
    for (const key in formData) {
        formDataMethod.append(key, formData[key]);
    }


    document.querySelector('.loaderBox').classList.remove("d-none");
    // Make the fetch request

    try {
        const response = await Getchaptersdetail(formDataMethod);

        if (response?.status == true) {
           

            document.querySelector('.loaderBox').classList.add("d-none");
        
            setShowModal(true)
            setTimeout(() => {
              setShowModal(false)
            }, 1000)
            chapterData()
            setIsChapter(false)
            setFormData({
              title: '',
              description: ''
            })



        } else {

        }
    } catch (error) {
        console.error("Error in adding model post:", error);
    }
};















// const chapterEdit = async () => {
//   try {
//     const response = await GetBookdetail(id)
//     console.log("response", response)


//     setBookdetail(response?.data)

//   } catch (error) {
//     console.error("Error in logging in:", error);

//     // toastAlert(error, ALERT_TYPES.ERROR);
//   }
// };









  // const chapterEdit = (e , chapetrid) => {
 
  //   e.preventDefault();

  //   const LogoutData = localStorage.getItem('login');
  //   fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/author/bookchapter_update/${chapetrid}`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${LogoutData}`
  //       },
  //       body: JSON.stringify(leadData)
  //     },
  //   )
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((data) => {
  //       console.log(data)
  //       editDetailData(chapetrid)
  //       setEditModal(false)
  //     })
  //     .catch((error) => {
  //       document.querySelector('.loaderBox').classList.add("d-none");
  //       console.log(error);
  //     })
  // }


  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Books Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              {/* <div className="row mb-3 justify-content-end">
                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                  <button onClick={() => {
                    data?.status ? setShowModal(true) : setShowModal3(true)
                  }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {data?.status ? 'Inactive' : 'Active'}</button>
                  <span className={`statusBadge ${data?.status == 1 ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{data?.status == 1 ? 'Active' : 'Inactive'}</span>
                </div>
              </div> */}

              <div className="row" >
                <div className="col-md-6 mb-4">

                  <div className="productImage">
                    <img src={base_url + Bookdetail?.cover} />
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Author Name</p>
                  <p>{Bookdetail?.author}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Title</p>
                  <p>{Bookdetail?.title}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Book Type</p>
                  <p>{Bookdetail?.type}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Book Language</p>
                  <p>
                    {Bookdetail?.lang}
                  </p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Book Pages</p>
                  <p>{Bookdetail?.pages}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Audiobook Duration</p>
                  <p>{Bookdetail?.audiobook_duration}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Book  Rating</p>
                  <p>{Bookdetail?.rating == null ? "No Rating" : Bookdetail?.rating}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Description</p>
                  <p>{Bookdetail?.description}</p>
                </div>

              </div>
            </div>
          </div>


















          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-between">
                <h2 className="mainTitle mb-4">
                  Book Chapters
                </h2>
                <div className="addChapter">
                  <CustomButton text="Add Chapter" variant="primaryButton" onClick={(() => {
                    setIsChapter(!isChapter)
                  })}></CustomButton>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <Accordion defaultActiveKey="0">
                {data?.chapters && data?.chapters?.map((item, index) => (
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header>{`Chapter ${index + 1}`}</Accordion.Header>
                    <Accordion.Body>
                      <div className="chapeditz d-flex">
                        <h3 className="text-capitalize">{item?.title}</h3>
                        <p>
                          <Link onClick={() => {
                            setEditModal(true)
                            editDetailData(item.id)
                          }} className="chaptableAction"><FontAwesomeIcon icon={faEdit} className="chaptableActionIcon" />Edit</Link>
                        </p>
                      </div>
                      <h3 className="text-capitalize">{item?.price}</h3>
                      <p> {item?.description}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
            {isChapter && (
              <div className="col-md-12 my-5 bg-light">
                <div className="chapterAdditionForom">
                  <div className="titleBox mb-4">
                    <h3 className="mainTitle">Add New Chapter</h3>
                  </div>
                  <div className="ChapterForm">
                    <CustomInput
                      label='Chapter Title'
                      required
                      id='title'
                      type='text'
                      placeholder='Enter Chapter Title'
                      labelClass='mainLabel'
                      inputClass='mainInput'
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />


                    <div class="inputWrapper">
                      <label for="description" class="mainLabel">Chapter Description<span>*</span></label>
                      <textarea rows={12} type="textarea" placeholder="Enter Chapter Description" required="" id="description" name="description" class="mainInput" value={formData.description}
                        onChange={handleChange}>
                      </textarea>
                    </div>
                  </div>

                  <div className="addNewChapter">
                    <CustomButton text="Add" variant="primaryButton" onClick={AddchapterSubmit}></CustomButton>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>




        <CustomModal
          show={showModal}
          close={() => {
            setShowModal(false);
          }}
          action={inActive}
          heading="Are you sure you want to mark this user as inactive?"
        />
        <CustomModal
          show={showModal2}
          close={() => {
            setShowModal2(false);
          }}
          success
          heading="Marked as Inactive"
        />

        <CustomModal
          show={showModal3}
          close={() => {
            setShowModal3(false);
          }}
          action={Active}
          heading="Are you sure you want to mark this user as Active?"
        />
        <CustomModal
          show={showModal4}
          close={() => {
            setShowModal4(false);
          }}
          success
          heading="Marked as Active"
        />





















        <CustomModal show={editModal} close={() => { setEditModal(false) }} heading="Edit Book Chapters" >


          <CustomInput
            label="Book Title"
            type="text"
            placeholder="Current Month Target"
            required
            name="title"
            labelClass='mainLabel'
            inputClass='mainInput'

            value={leadData?.title}
            onChange={(event) => {
              setLeadData({ ...leadData, title: event.target.value });

            }}


          />
          <CustomInput
            label="Book Descripction"
            type="text"
            placeholder="book descripction"
            required
            name="description"
            labelClass='mainLabel'
            inputClass='mainInput'

            value={leadData.description}
            onChange={(event) => {
              setLeadData({ ...leadData, description: event.target.value });
            }}


          />
          <CustomInput
            label="Book Price


"
            type="number"
            placeholder="book price"
            required
            name="price"
            labelClass='mainLabel'
            inputClass='mainInput'

            value={leadData.price}
            onChange={(event) => {
              setLeadData({ ...leadData, price: event.target.value });

            }}
             />



          <CustomButton variant='primaryButton' text='Edit' type='button' onClick={handleEdit} />
        </CustomModal>
        <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Chapter Added Successfully.' />
      </DashboardLayout>
    </>
  );
};

