// import React from 'react'

// const EditProducts = () => {
//     return (
//         <div>
//             <Modal
//                 aria-labelledby="transition-modal-title"
//                 aria-describedby="transition-modal-description"
//                 className={classes.modal}
//                 open={open}
//                 closeAfterTransition
//                 BackdropComponent={Backdrop}
//                 BackdropProps={{
//                     timeout: 500,
//                 }}
//             >
//                 <Fade in={open}>
//                     <div className={classes.paper}>
//                         <h5 className="text-center mt-4">Update</h5>
//                         <Container className={classes.mainContainer}>
//                             {/* Form */}
//                             {
//                                 material ? (
//                                     <form onSubmit={handleSubmit(onSubmit)}>
//                                         <Grid container spacing={1}>
//                                             <Grid lg={12} md={12} sm={12}>
//                                                 <CssTextField id="outlined-basic"
//                                                     label="Select Category"
//                                                     variant="outlined"
//                                                     type="text"
//                                                     autocomplete="off"
//                                                     size="small"
//                                                     select
//                                                     className={classes.inputFieldStyle}
//                                                     inputProps={{ style: { fontSize: 14 } }}
//                                                     InputLabelProps={{ style: { fontSize: 14 } }}
//                                                     defaultValue={material.category._id}
//                                                     {...register("category", { required: true })}
//                                                 >
//                                                     {
//                                                         !categories || !categories.length ? <p>Data Not Found</p> :
//                                                             categories.map(category => (
//                                                                 <MenuItem value={category._id} key={category._id}>{category.name}</MenuItem>
//                                                             ))
//                                                     }
//                                                 </CssTextField>
//                                             </Grid>
//                                             <Grid lg={12} md={12} sm={12}>
//                                                 <CssTextField id="outlined-basic"
//                                                     label="Enter Material Name"
//                                                     variant="outlined"
//                                                     type="text"
//                                                     autocomplete="off"
//                                                     size="small"
//                                                     autoComplete="off"
//                                                     defaultValue={material.name}
//                                                     className={classes.inputFieldStyle1}
//                                                     inputProps={{ style: { fontSize: 14 } }}
//                                                     InputLabelProps={{ style: { fontSize: 14 } }}
//                                                     {...register("name", { required: true, maxLength: 30 })}
//                                                 />
//                                                 {
//                                                     errors.category?.type === 'required' && <p className="mt-3 text-danger">Category must be required</p>
//                                                 }
//                                                 <br />
//                                                 {
//                                                     errors.name?.type === 'required' && <p className="text-danger">Material name is required</p>
//                                                 }
//                                                 <br />
//                                                 {
//                                                     errors.name?.type === 'maxLength' && <p className="text-danger">Length must be less than 30</p>
//                                                 }
//                                                 {
//                                                     isUpdate ? <p className="text-success">Material Edit Success</p> : (
//                                                         isError ? <p className="text-danger">Material Edit Fail Internal Server Error</p> : null
//                                                     )
//                                                 }
//                                             </Grid>
//                                         </Grid>
//                                         <div>
//                                             <Button variant="outlined" color="primary"
//                                                 className={classes.addButton}
//                                                 type="submit"
//                                             >
//                                                 Update
//                                     </Button>
//                                             <Button variant="outlined" color="primary"
//                                                 className={classes.closeButton}
//                                                 onClick={handleClose}
//                                             >
//                                                 close
//                                     </Button>
//                                         </div>
//                                     </form>
//                                 ) : null
//                             }
//                         </Container>
//                     </div>
//                 </Fade>
//             </Modal>
//         </div>
//     )
// }

// export default EditProducts
