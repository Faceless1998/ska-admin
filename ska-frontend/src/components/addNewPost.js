import React from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  MuiThemeProvider,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import env from "./../env.json";

const theme = createTheme({
  props: {
    MuiTextField: {
      variant: "outlined",
      margin: "dense",
    },
    MuiFormControl: {
      variant: "outlined",
      margin: "dense",
    },
  },
});

export default function AddNewPost() {
  const [name, setName] = useState("");
  const [nameGE, setNameGE] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionGE, setDescriptionGE] = useState("");

  const [thumbImg, setThumbImg] = useState();
  const [postImg, setPostImg] = useState();
  const [feature, setFeature] = useState("");
  const [featureGE, setFeatureGE] = useState("");

  const [selectType, setSelectType] = useState();
  const [type, setType] = useState("true");

  const onChange = (e) => {
    let x = [];
    if (e.target.files.length > 1) {
      for (let i = 0; i < e.target.files.length; i++) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
          console.log("eld");
          let fileURL = fileReader.result;
          console.log(fileURL);
          x = [...x, fileURL];
          console.log(x);
          setPostImg(x);
        };
        fileReader.readAsDataURL(e.target.files[i]);
      }
    } else {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        let fileURL = fileReader.result;
        setThumbImg(fileURL);
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const upload = () => {
    const data = { name, description, feature, thumbImg, postImg };
    const dataGE = { nameGE, descriptionGE, featureGE };
      axios
        .post(`${env.URL}/post/add`, {
          type,
          data,
          dataGE,
        })
        .then((response) => {
          if (response.data.success) {
            alert("პროდუქტი წარმატებით დაემატა");
          } else {
            alert("პროდუქტის დამატება ვერ მოხერხდა");
          }
        });
  };

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md">
          <Box p={2}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Link to="/" style={{ fontSize: 30, textAlign: "center" }}>
                <i class="far fa-arrow-circle-left"></i>
              </Link>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectType && (
                  <>
                    <select
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    >
                      <option value="false" defaultChecked>
                        აირჩიეთ პროდუქტის ტიპი
                      </option>
                      {selectType.map((item) => {
                        return (
                          <>
                            <option value={item}>{item}</option>
                          </>
                        );
                      })}
                    </select>
                  </>
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <h3>ინგლისური</h3>
                <TextField
                  placeholder="დასახელება(EN)"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></TextField>
                <TextField
                  placeholder="აღწერა(EN)"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></TextField>
                <TextareaAutosize
                  placeholder="მახასიათებლები(EN)"
                  minRows={4}
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: 5,
                    marginTop: 5,
                  }}
                  value={feature}
                  onChange={(e) => {
                    setFeature(e.target.value);
                  }}
                />
                <h3>მთავარი ფოტო</h3>
                <input type="file" onChange={onChange} />
                <h3>პროდუქტის ფოტოები</h3>
                <input type="file" onChange={onChange} multiple />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: 20,
                }}
              >
                <h3>ქართული</h3>

                <TextField
                  placeholder="დასახელება(GE)"
                  value={nameGE}
                  onChange={(e) => {
                    setNameGE(e.target.value);
                  }}
                ></TextField>
                <TextField
                  placeholder="აღწერა(GE)"
                  value={descriptionGE}
                  onChange={(e) => {
                    setDescriptionGE(e.target.value);
                  }}
                ></TextField>
                <TextareaAutosize
                  placeholder="მახასიათებლები(GE)"
                  minRows={4}
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: 5,
                    marginTop: 5,
                  }}
                  value={featureGE}
                  onChange={(e) => {
                    setFeatureGE(e.target.value);
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
             
              <Button
                variant="contained"
                type="submit"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={() => {
                  upload();
                }}
              >
                პროდუქტის დამატება
              </Button>
            </div>
          </Box>
        </Container>
      </MuiThemeProvider>
    </>
  );
}
