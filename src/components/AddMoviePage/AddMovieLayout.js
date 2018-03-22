import React, {Component} from "react";
import "../../styles/AddMovieLayout.less";
import block from '../../helpers/BEM';
import InputFields from "./InputFields";

const b = block("AddMovieLayout");


const AddMovieLayout = () => (
    <div className={b()}>
        <InputFields/>
    </div>
)

export default AddMovieLayout;