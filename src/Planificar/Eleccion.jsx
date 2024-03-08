import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import CheckIcon from '@mui/icons-material/Check';
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Marker, Popup, useMap } from "react-leaflet";


export default function Eleccion({ puntos, setPuntos, setChecked }) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState(null);

    const handleSwitchChange = (i) => {
        setPuntos(prevPuntos => {
            const ptosActualizados = [...prevPuntos];
            ptosActualizados[i] = { ...ptosActualizados[i], seleccionado: !ptosActualizados[i].seleccionado };
            return ptosActualizados;
        });

        setChecked(prevChecked => {
            const id = puntos[i].id_punto_interes;
            if (!prevChecked.includes(id)) {
                return [...prevChecked, id];
            } else {
                return prevChecked.filter(puntoId => puntoId !== id);
            }
        });
    };

    const handleVerInfo = (punto) => {
        setSelectedPoint(punto);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <div style={{ overflowY: 'auto', maxHeight: '20rem', display: 'flex', flexDirection: 'column', marginTop: '2rem', padding: '2rem' }}>
                    {puntos.map((punto, index) => (
                        <div key={punto.id_punto_interes} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                            <Switch
                                color="warning"
                                size="lg"
                                variant="solid"

                                checked={punto.seleccionado}
                                onChange={() => handleSwitchChange(index)}
                            />
                            <p style={{ marginLeft: '10px', flexGrow: 1 }}>{punto.nombre} {punto.visitados.length > 0 && <CheckIcon fontSize='small'></CheckIcon>}</p>
                            <Button variant="contained" color="warning" onClick={() => handleVerInfo(punto)}>
                                Ver info
                            </Button>
                        </div>
                    ))}
                </div>
            </Grid>

            <Modal open={openModal} onClose={handleCloseModal}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '2rem', width: '80vw', height: '70vh', overflow: 'auto' }}>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div>
                                {selectedPoint && (
                                    <div>
                                        <h2>{selectedPoint.nombre}</h2>
                                        <p>{selectedPoint.descripcion}</p>
                                    </div>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{ textAlign: 'center', width: '35vw', height: '25vw' }}>
                                {selectedPoint && (
                                    <div style={{ width: '100%', height: '100%' }}>
                                        <img src={selectedPoint.imagen} alt="Imagen del punto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{ width: '100%', height: '100%', border: '1px solid black', borderRadius: '4px', overflow: 'hidden' }}>
                                <MapContainer
                                    center={[selectedPoint ? selectedPoint.latitud : 0, selectedPoint ? selectedPoint.longitud : 0]}
                                    scrollWheelZoom={true}
                                    zoom={selectedPoint ? 13 : 1}
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {selectedPoint && (
                                        <Marker position={[selectedPoint.latitud, selectedPoint.longitud]}></Marker>
                                    )}
                                </MapContainer>
                            </div>
                        </Grid>
                    </Grid>

                </div>
            </Modal>
        </Grid>
    );
}
