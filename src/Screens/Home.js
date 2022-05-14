import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {Paper,TableRow,TableHead,TableContainer,TableCell,TableBody,Table,Modal,Button,Grid,Box,
    Backdrop,Fade, Typography} from '@mui/material';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

const style = { position: 'relative',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width:'75%', 
height:'100%', bgcolor: 'background.paper',border: '2px solid #000',boxShadow: 24, p: 4, overflow: 'scroll'};

const ShowSection = ({data,position}) => {
    const dataObj = JSON.parse(data);
    if(position === 0){
        return (<> 
            {/* <Grid item md={12} sx={{ fontWeight: 'bold' }}>Personal : </Grid>            */}
            <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12}>Name : {dataObj.personalinfo.fname} {dataObj.personalinfo.lname}</Grid>
                <Grid item xs={12} md={6}>Address : {dataObj.personalinfo.address}</Grid>
                <Grid item xs={12} md={6}>Contact No. : {dataObj.personalinfo.contactno}</Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12}>
                    <img src={dataObj.imageState.ImageURL} width="120" height="150" align="right"/>
                </Grid>
            </Grid>
        </>);
    }
    if(position === 1){
        return (<>
        <Grid item md={12} sx={{ fontWeight: 'bold', mb : 1 }}>Academic Qualifications : </Grid>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell>Course</TableCell>
                    <TableCell align="center">Completion Year</TableCell>
                    <TableCell align="left">School/College</TableCell>
                    <TableCell align="center">Percentage</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {dataObj.map((obj, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{obj.course}</TableCell>
                <TableCell align="center">{obj.cyear}</TableCell>
                <TableCell align="left">{obj.college}</TableCell>
                <TableCell align="center">{obj.percentage}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </>);
    }
    if(position === 2){
        return (<>
        <Grid item md={12} sx={{ fontWeight: 'bold' }}>Skills : </Grid>             
        {dataObj.map((obj, index) => (<>
            <Grid item md={12} key={index}>{obj.skill}</Grid>                                     
        </>))}
        </>);
    }
    if(position === 3){
        return (<>
        <Grid item md={12} sx={{ fontWeight: 'bold', mb : 1 }}>Mini Projects : </Grid>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell>Project Name</TableCell>
                    <TableCell align="left">Technology</TableCell>
                    <TableCell align="left">Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {dataObj.map((obj, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{obj.projectname}</TableCell>
                    <TableCell align="left">{obj.technology}</TableCell>
                    <TableCell align="left">{obj.description}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </>);
    }
    if(position === 4){
        return (<>
        <Grid item md={12} sx={{ fontWeight: 'bold', mb : 1 }}>Social Media : </Grid>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell>Social Media</TableCell>
                    <TableCell align="left">Link</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {dataObj.map((obj, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{obj.socialmedia}</TableCell>
                    <TableCell align="left">{obj.link}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </>);
    }
}

const Home = ({listState}) => {
    const [open, setOpen] = useState(false);
    const handleModalOpen = () => setOpen(true);
    const handleModalClose = () => setOpen(false);
    const inputRef = useRef(null);

    const printDocument = () => {
        html2canvas(inputRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const pdf = new jsPDF('p', 'px', 'letter');
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("download.pdf");
        });
    };

    return (<>
    <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description"
    open={open} onClose={handleModalClose} closeAfterTransition BackdropComponent={Backdrop}
    BackdropProps={{timeout: 500,}}>
    <Fade in={open}>    
    <Box sx={style}>
        <Box sx={{ width: '100%' }} ref={inputRef}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {listState.length === 0 ? (
                <div><h1>No filled resume found</h1></div>
            ) : (
                <div><h3 align="center">Resume</h3></div>    
            )}  
            </Box>                
            {listState.map((dataitem, index) => (
                <Box sx={{ mt:2, mx:4 }}>
                    <Grid container spacing={1}>
                        <ShowSection data={dataitem} position={index} />
                    </Grid>  
                </Box>                                    
            ))}                
        </Box>
        <Box sx={{ mt:2, mx:4 }}>
            <Grid container spacing={1}>
                <Button variant="contained" onClick={printDocument}>Download</Button>    
            </Grid>  
        </Box>
    </Box>
    </Fade>    
    </Modal>
    <Box sx={{ width: '100%', mt:'50px' }}>
        <Typography align='center'><h1>RESUME BUILDER</h1></Typography>
        <Typography align='center'><h3>PART I - PART IV are mandatory. PART V is Optional</h3></Typography>
        <Typography align='center'><h4>To  enable preview, Complete the form upto PART-IV</h4></Typography>
        <Grid container spacing={5} justifyContent="center" sx={{mt:'100px'}}>   
            <Grid item sx={6} md={{mx:'100px'}}>
                <Link to='/fill-resume' style={{textDecoration:"none"}}><Button variant='contained'>Fill Resume</Button></Link>
            </Grid>
            {listState[3] ? (
                <Grid item sx={6} md={{mx:'100px'}}>
                    <Button variant="contained" onClick={handleModalOpen}>Preview Resume</Button>
                </Grid>
            ) : (
                <Grid item sx={6} md={{mx:'100px'}}>
                    <Button variant="contained" onClick={handleModalOpen} disabled>Preview Resume</Button>
                </Grid>
            )}
        </Grid>        
    </Box>
    </>);
}

const mapStateToProps = (state) => ({
    listState: state.list
})

export default connect(mapStateToProps, null)(Home);