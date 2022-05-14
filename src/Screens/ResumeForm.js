import React,{useState} from 'react';
import {Grid,Typography,Input,Button,Box,Tab,Tabs, TextField} from '@mui/material';
import { addPersonalData, addQualificationData, addSkillData, addProjectData,
    addSocialMediaData } from '../action/list';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

const checkProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ResumeForm = ({ addPersonalData, addQualificationData, addSkillData, addProjectData,
    addSocialMediaData, listState }) => {
    const [value, setValue] = useState(0);    
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const TabPanel = (props) => {
        const { value, index, reduxlist } = props;
        const [personalinfo, setPersonalinfo] = useState({fname:"",lname:"",address:"",contactno:""});
        const {fname,lname,address,contactno} = personalinfo;
        const [imageState, setImageState] = useState({FileInfo:"", ImageURL:""});
        const {FileInfo,ImageURL} = imageState;
        const [values, setValues] = useState({error: "",success:""});
        const {error,success} = values;
        const [qualifications, setQualifications] = useState([{course:"", cyear:"", college:"", percentage:""}]);
        const [skills, setSkills] = useState([{skill:""}]);
        const [projects, setProjects] = useState([{projectname:"",technology:"",description:""}]);
        const [socialmedias, setSocialmedias] = useState([{socialmedia:"",link:""}]);

        const addQualificationField = () => {
            setQualifications([...qualifications, { course:"", cyear:"", college:"", percentage:""}]);
        }
        const removeQualificationField = indexId => {
            const newList = qualifications.filter((list,index) => index !== indexId)
            setQualifications(newList);
        }        
        const addSkillField = () => {
            setSkills([...skills, { skill:""}]);
        }
        const removeSkillField = indexId => {
            const newList = skills.filter((list,index) => index !== indexId)
            setSkills(newList);
        }        
        const addProjectField = () => {
            setProjects([...projects, {projectname:"",technology:"",description:""}]);
        } 
        const removeProjectField = indexId => {
            const newList = projects.filter((list,index) => index !== indexId)
            setProjects(newList);
        }       
        const addSocialMediaField = () => {
            setSocialmedias([...socialmedias, {socialmedia:"",link:""}]);
        }
        const removeSocialMediaField = indexId => {
            const newList = socialmedias.filter((list,index) => index !== indexId)
            setSocialmedias(newList);
        }
        const handleChangePersonal = name => event => {
            const value = name === "photo" ? event.target.files[0] : event.target.value;
            if(name === "photo") {
                setImageState({
                    FileInfo: event.target.files[0],
                    ImageURL: URL.createObjectURL(event.target.files[0])
                });
            }
            else {
                setPersonalinfo({...personalinfo, [name] : value});
            }
        };
        const savePersonal = () => {
            var contactnoLength = personalinfo.contactno.toString().length;
            if(personalinfo.fname === "" || personalinfo.lname === "" || personalinfo.address === "" ||
            personalinfo.contactno === "" || imageState.ImageURL === ""){
                setValues({...values, error:"All fields are mandatory", success:""});
            }
            else if(contactnoLength < 10 || contactnoLength > 10){
                setValues({...values, error:"Contact number must be of 10 digits", success:""});
            }
            else {
                setValues({...values, error:"",success:"Data Saved"});
                const personalJson = JSON.stringify({personalinfo,imageState});
                addPersonalData(personalJson);
            }
        }
        const handleChangeQualification = (i, e) => {
            let newqualification = [...qualifications];
            newqualification[i][e.target.name] = e.target.value;
            setQualifications(newqualification);
        }
        const saveQualifications = async () => {
            let errorFlag = 0;
            qualifications.map((q,index) => {
                if(q.course === "" || q.cyear === "" || q.college === "" || q.percentage === "")
                {
                    errorFlag = 1;
                }
                else if(q.percentage < 30 || q.percentage > 100)
                {
                    errorFlag = 2;
                }
            })
            if(errorFlag === 1){
                setValues({...values, error:"All fields are mandatory", success:""});
            }
            else if(errorFlag === 2){
                setValues({...values, error:"Percentage should be between 30 to 100", success:""});
            }
            else if(errorFlag === 0){
                setValues({...values, error:"", success:"Data Saved"});
                const qualificationJson = JSON.stringify(qualifications);
                addQualificationData(qualificationJson);
            }
        }
        const handleChangeSkill = (i, e) => {
            let newskill = [...skills];
            newskill[i][e.target.name] = e.target.value;
            setSkills(newskill);
        }
        const saveSkills = () => {
            let errorFlag = 0;
            skills.map((s,index) => {
                if(s.skill === "")
                {
                    errorFlag = 1;
                }
            })
            if(errorFlag === 1){
                setValues({...values, error:"All fields are mandatory", success:""});    
            }
            else {
                setValues({...values, error:"", success:"Data Saved"});
                const skillJson = JSON.stringify(skills);
                addSkillData(skillJson);
            }
        }
        const handleChangeProject = (i, e) => {
            let newsproject = [...projects];
            newsproject[i][e.target.name] = e.target.value;
            setProjects(newsproject);
        }
        const saveProjects = () => {
            let errorFlag = 0;
            projects.map((p,index) => {
                if(p.projectname === "" || p.technology === "" || p.description === "")
                {
                    errorFlag = 1;
                }
            })
            if(errorFlag === 1){
                setValues({...values, error:"All fields are mandatory", success:""});    
            }
            else {
                setValues({...values, error:"", success:"Data Saved"});
                const projectJson = JSON.stringify(projects);
                addProjectData(projectJson);
            }
        }
        const handleChangeSocialMedia = (i, e) => {
            let newsmedia = [...socialmedias];
            newsmedia[i][e.target.name] = e.target.value;
            setSocialmedias(newsmedia);
        }
        const saveSocialMedias = () => {
            let errorFlag = 0;
            socialmedias.map((s,index) => {
                if(s.socialmedia === "" || s.link === "")
                {
                    errorFlag = 1;
                }
            })
            if(errorFlag === 1){
                setValues({...values, error:"All fields are mandatory", success:""});    
            }
            else {
                setValues({...values, error:"", success:"Data Saved"});
                const socialmediaJson = JSON.stringify(socialmedias);
                addSocialMediaData(socialmediaJson);
            }
        }
                
        return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} 
        aria-labelledby={`simple-tab-${index}`}>
        
        {error!=="" ? <Typography align="center" color="red">{error}</Typography> : ""}
        {success!=="" ? <Typography align="center" color="green">{success}</Typography> : ""}

        {value === index && ( value === 0 && (
            reduxlist.length === 0 ? (
                <Box sx={{ p: 3 }}>  
                <Grid container spacing={1}>        
                <Grid item xs={12} md={6}>
                    <TextField required value={fname} onChange={handleChangePersonal("fname")} id="outlined-basic" fullWidth  margin="dense" size="small" label="First name" variant="outlined" helperText="Required" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required value={lname} onChange={handleChangePersonal("lname")} id="outlined-basic" fullWidth margin="dense" size="small" label="Last name" variant="outlined" helperText="Required" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required value={address} onChange={handleChangePersonal("address")} id="outlined-basic" fullWidth margin="dense" label="Address" multiline variant="outlined" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required type="number" value={contactno} inputProps={{maxLength: 10}} onChange={handleChangePersonal("contactno")} id="outlined-basic" fullWidth margin="dense" size="small" label="Contact No." 
                           variant="outlined" helperText="Required" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Input type="file" accept="image" onChange={handleChangePersonal("photo")} id="outlined-basic" fullWidth margin="dense" size="small" label="Contact No." 
                           variant="outlined" helperText="Required" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid item xs={12} md={12}>
                    {ImageURL && (
                        <div>
                            <img src={ImageURL} alt="ImagePreview" width="120" height="150" />
                        </div>
                    )}    
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button variant="contained" color="success" onClick={savePersonal} margin="dense" sx={{ mx: 1 }}>Save</Button>
                </Grid>
            </Grid> 
            </Box>
            ) : (
                <Typography sx={{mx:'35%', mt:'100px'}} color='green'>You have completed this part</Typography>    
            )
            
        ))}

        { value === index && ( value === 1 && (
            reduxlist.length !== 0 && reduxlist[0] ?  (
                reduxlist[1] ? (
                    <Typography sx={{mx:'35%', mt:'100px'}} color='green'>
                        You have completed this part</Typography>
                ) : (
                    <Box sx={{ p: 1 }}>
                    <Grid container>
                    {qualifications.map((rownumber, index) => (<>
                        <Grid item xs={3} md={3}>
                            <TextField sx={{ mx: 1}} name="course" fullWidth value={rownumber.course} onChange={(e) => handleChangeQualification(index, e)} id="outlined-basic"  margin="dense" size="small" label="Course" variant="outlined" helperText="Required" />
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <TextField type="number" sx={{ mx: 1}} name="cyear" fullWidth value={rownumber.cyear} onChange={(e) => handleChangeQualification(index, e)} id="outlined-basic"  margin="dense" size="small" label="Completion Year" variant="outlined" helperText="Required" />
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <TextField sx={{ mx: 1}} name="college" fullWidth value={rownumber.college} onChange={(e) => handleChangeQualification(index, e)} id="outlined-basic"  margin="dense" size="small" label="School/College" variant="outlined" helperText="Required" />
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <TextField type="number" sx={{ mx: 1}} name="percentage" fullWidth value={rownumber.percentage} onChange={(e) => handleChangeQualification(index, e)} id="outlined-basic"  margin="dense" size="small" label="Percentage" variant="outlined" helperText="Required" /><br />
                        </Grid>
                        {index !== 0 ? (
                            <Grid item xs={2} md={2}>
                                <Button sx={{ ml: 2, mt: 1}} color='error' variant="contained" onClick={()=>removeQualificationField(index)} >Remove</Button>    
                            </Grid>
                        ) : (
                            <Grid item xs={2} md={2}></Grid>    
                        )}
                    </>))}
                    </Grid>
                    <Grid container>        
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" onClick={addQualificationField} sx={{ mx: 1 }} >Add More Field</Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" color="success" onClick={saveQualifications} sx={{ mx: 1 }} >Save</Button>    
                        </Grid>
                    </Grid>
                    </Box>
                )
                
            ) : (
                <Typography sx={{mx:'35%', mt:'100px'}} color='red'>Please complete the first part of the form</Typography>
            )
            
        ))}

        { value === index && ( value === 2 && (
            reduxlist.length !== 0 && reduxlist[1] ? (
                reduxlist[2] ? (
                    <Typography sx={{mx:'35%', mt:'100px'}} color='green'>
                        You have completed this part</Typography>
                ) : (
                    <Box sx={{ p: 2 }}>
                    <Grid container>
                    {skills.map((rowno, index) => (<>
                    <Grid item xs={12} md={12} key={index}>
                        <TextField sx={{ mx: 1 }} name="skill" value={rowno.skill} onChange={(e) => handleChangeSkill(index, e)} id="outlined-basic" style ={{width: '20%'}} margin="dense" size="small" label="Skill" variant="outlined" helperText="Required" />
                    {index !== 0 ? (
                        <Button sx={{ ml: 2, mt: 1}} color='error' variant="contained" onClick={()=>removeSkillField(index)} >Remove</Button>
                    ) : (
                        <></>    
                    )}
                    </Grid>
                    </>))}
                    </Grid>
                    <Grid container>        
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" onClick={addSkillField} sx={{ mx: 1 }}>Add More Field</Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" color='success' onClick={saveSkills} sx={{ mx: 1 }}>Save</Button>    
                        </Grid>
                    </Grid>
                    </Box>
                )
            ) : (
            <Typography sx={{mx:'35%', mt:'100px'}} color='red'>Please complete the second part of the form</Typography>    
            )
            
        ))}

        { value === index && ( value === 3 && (
            reduxlist.length !== 0 && reduxlist[2] ? (
                reduxlist[3] ? (
                    <Typography sx={{mx:'35%', mt:'100px'}} color='green'>
                        You have completed this part</Typography>
                ) : (
                    <Box sx={{ p: 2 }}>
                    <Grid container>
                    {projects.map((project, index) => (<>
                        <Grid item xs={3} md={3}>
                            <TextField sx={{ mx: 1 }} name="projectname" fullWidth value={project.projectname} onChange={(e) => handleChangeProject(index, e)} id="outlined-basic" margin="dense" size="small" label="Project name" variant="outlined" helperText="Required" />
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <TextField sx={{ mx: 1 }} name="technology" fullWidth value={project.technology} onChange={(e) => handleChangeProject(index, e)} id="outlined-basic" margin="dense" size="small" label="Technology used" variant="outlined" helperText="Required" />
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <TextField sx={{ mx: 1 }} name="description" fullWidth value={project.description} onChange={(e) => handleChangeProject(index, e)} id="outlined-basic" margin="dense" size="small" multiline label="Description of the project" variant="outlined" helperText="Required" />
                        </Grid>
                        <Grid item xs={3} md={3}>
                            {index !== 0 ? (
                                <Button sx={{ ml: 2, mt: 1}} color='error' variant="contained" onClick={()=>removeProjectField(index)} >Remove</Button>
                            ) : (
                                <></>    
                            )}
                        </Grid>                       
                        </>))}
                    </Grid>
                    <Grid container>        
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" onClick={addProjectField} sx={{ mx: 1 }}>Add More Field</Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" color='success' onClick={saveProjects} sx={{ mx: 1 }}>Save</Button>    
                        </Grid>
                    </Grid>
                    </Box>
                )
            ) : (
                <Typography sx={{mx:'35%', mt:'100px'}} color='red'>Please complete the third part of the form</Typography>
            )
        ))}

        { value === index && ( value === 4 && (
            reduxlist.length !== 0 && reduxlist[3] ? (
                reduxlist[4] ? (
                    <Typography sx={{mx:'35%', mt:'100px'}} color='green'>
                        You have completed this part</Typography>
                ) : (
                    <Box sx={{ p: 2 }}>
                    <Grid container>
                    {socialmedias.map((smedia, index) => (
                    <>
                        <Grid item xs={4} md={4}>
                            <TextField sx={{ mx: 1 }} name="socialmedia" value={smedia.socialmedia} onChange={(e) => handleChangeSocialMedia(index, e)} id="outlined-basic" fullWidth margin="dense" size="small" label="Social Media" variant="outlined" placeholder="e.g. github,linkind etc"/>    
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <TextField sx={{ mx: 1 }} name="link" value={smedia.link} onChange={(e) => handleChangeSocialMedia(index, e)} id="outlined-basic" fullWidth margin="dense" size="small" label="Link" variant="outlined" />    
                        </Grid>
                        <Grid item xs={4} md={4}>
                            {index !== 0 ? (
                                <Button sx={{ ml: 2, mt: 1}} color='error' variant="contained" onClick={()=>removeSocialMediaField(index)} >Remove</Button>
                            ) : (
                                <></>    
                            )}        
                        </Grid>
                    </>
                    ))}
                    </Grid>
                    <Grid container>        
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" onClick={addSocialMediaField} sx={{ mx: 1 }}>Add More Field</Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" color='success'  onClick={saveSocialMedias} sx={{ mx: 1 }}>Save</Button>    
                        </Grid>
                    </Grid>               
                    </Box>
                )
            ) : (
                <Typography sx={{mx:'35%', mt:'100px'}} color='red'>Please complete the fourth part of the form</Typography>    
            )            
        ))}
        </div>
        );
    }

    return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Personal Profile (PART-I)" {...checkProps(0)} />
          <Tab label="Educational Qualifications (PART-II)" {...checkProps(1)} />
          <Tab label="Skills (PART-III)" {...checkProps(2)} />
          <Tab label="Mini Project (PART-IV)" {...checkProps(3)} />
          <Tab label="Social Mention (PART-V)" {...checkProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} reduxlist={listState} />
      <TabPanel value={value} index={1} reduxlist={listState} />
      <TabPanel value={value} index={2} reduxlist={listState} />
      <TabPanel value={value} index={3} reduxlist={listState} />
      <TabPanel value={value} index={4} reduxlist={listState} />
    </Box>
    );
}

//For retrieving current state from redux store
const mapStateToProps = (state) => ({
    listState: state.list
})

//For dispatching actions to the redux store
const mapDispatchToProps = {
    addPersonalData: (data) => addPersonalData(data),
    addQualificationData: (data) => addQualificationData(data),
    addSkillData: (data) => addSkillData(data),
    addProjectData: (data) => addProjectData(data),
    addSocialMediaData: (data) => addSocialMediaData(data)
    
}

//Property types for used redux store elements like function and array 
ResumeForm.prototype = {
    addPersonalData: propTypes.func.isRequired,
    addQualificationData: propTypes.func.isRequired,
    addSkillData: propTypes.func.isRequired,
    addProjectData: propTypes.func.isRequired,
    addSocialMediaData: propTypes.func.isRequired,
    listState: propTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeForm);