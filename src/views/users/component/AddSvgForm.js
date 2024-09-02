import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
const activeStyle = {
    borderColor: "#2196f3",
};

const acceptStyle = {
    borderColor: "#00e676",
};

const rejectStyle = {
    borderColor: "#ff1744",
};
function AddSvgForm({ onChange, error, isEdit, image,isMobile }) {
    console.log("isMobile",isMobile)
    const baseStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        borderWidth: 2,
        borderRadius: 10,
        height: isMobile ? '100%' : "300px",
        width:  isMobile ? '50vw' : "auto",
        borderColor: error ? "#ff1744" : "#eeeeee",
        borderStyle: "dashed",
        backgroundColor: "#224957",
        color: error ? "#ff1744" : "#bdbdbd",
        transition: "border .3s ease-in-out",
        justifyContent: "center",
    };
    const [files, setFiles] = useState([]);


    useEffect(() => {
        if (image) {
            setFiles([
                {
                    preview: `${BASE_URL}${image}`,
                },
            ]);
        }
    }, [image]);


    const onDrop = useCallback((acceptedFiles) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        );

        onChange(acceptedFiles[0]);
    }, [onChange]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: "image/svg+xml",
    });

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [baseStyle, isDragActive, isDragReject, isDragAccept]
    );

    const thumbs = files.map((file) => (
        <div key={file.name}>
            <img
                width={"100px"}
                height={"100px"}
                style={{ borderRadius: 10 }}
                src={file.preview}
                alt={file.name}
            />
        </div>
    ));

    // clean up
    useEffect(
        () => () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    console.log("files",files)

    return (
        <section>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <div>
                    {error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <div>Drag and Drop csv file or other extension.</div>
                    )}
                </div>
            </div>
          
                <aside>{thumbs}</aside>
        </section>
    );
}

export default AddSvgForm