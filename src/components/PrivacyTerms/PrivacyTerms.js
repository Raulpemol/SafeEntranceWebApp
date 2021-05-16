import React, { Component } from 'react';
import './PrivacyTerms.css';
import Card from '@material-ui/core/Card';

class PrivacyTerms extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
        <div className="MainTerms" style={{backgroundImage:"url('/img/green_background.jpg')"}}>
            <Card id="CardTerms" variant="outlined" style={{backgroundColor: "#baf2e9", overflow: "scroll"}}>
                <h2>Aviso legal y política de privacidad</h2>
                <h3>Información sobre el propietario</h3>
                <p>Este sitio web es propiedad de la Escuela de Ingeniería Informática de Universidad de Oviedo. Se detallan a continuación sus datos de contacto:</p>
                <ul>
                    <li>Dirección: Calle Valdés Salas, Nº 11, CP 33007, Oviedo, Asturias, España.</li>
                    <li>Email: eii@uniovi.es</li>
                    <li>Teléfono (+34) 985 10 27 96</li>
                </ul>
                <p>Este portal está constituido por todos los dominios y subdominios asociados a safeentranceapp.z19.web.core.windows.net.</p>
                
                <h3>Responsabilidad sobre el contenido</h3>
                <p>La Universidad de Oviedo no se hace responsable de la legalidad de otros sitios web de terceros desde los que se pueda acceder a esta aplicación web.</p>
                <p>La Universidad de Oviedo se reserva el derecho a realizar cambios en la página web sin previo aviso, con el fin de mantener el portal actualizado, mejorando cualquier aspecto que se crea conveniente o implementando nuevas funcionalidades.</p>
                <p>La Universidad de Oviedo no será responsable del uso que terceros hagan de la información publicada en este sitio web. Como consecuencia, no se hace responsable de los daños sufridos o pérdidas económicas que, de forma directa o indirecta, produzcan o puedan producir perjuicios económicos, materiales o sobre datos, provocados por el uso de dicha información.</p>
                
                <h3>Política de cookies</h3>
                <p>Este sitio web no hace uso de cookies de sesión o de navegación, por lo que no se realiza ningún estudio ni se almacenan datos de navegación, acceso al portal, entradas a formularios, etcétera.</p>

                <h3>Datos del responsable del tratamiento de datos</h3>
                <ul>
                    <li>Nombre completo: Raúl Pérez Molinero</li>
                    <li>Domicilio: Calle Miguel de Unamuno, Nº8, CP 33010, Oviedo, Asturias, España</li>
                    <li>Teléfono de contacto: 634566609</li>
                    <li>Correo electrónico: UO263743@uniovi.es</li>
                </ul>

                <h3>Datos tratados</h3>
                <p>En el portal SafeEntrance no se recopilan ni almacenan datos personales.</p>
                <p>En cuanto a los datos obtenidos al registrar un local, en el sistema se almacenan el nombre, la dirección y el aforo de dicho local a registrar.</p>

                <h3>Finalidad del tratamiento de datos</h3>
                <p>Los datos facilitados por los propietarios de los establecimientos se utilizarán para identificar dicho local, permitir al resto de usuarios comprobar si está registrado en el sistema de rastreo SafeEntrance y para realizar labores automáticas de rastreo de posibles contagios de coronavirus u otras enfermedades a considerar producidos dentro de dicho local.</p>
                <p>En ningún momento la información facilitada será sometida a un tratamiento manual o automático de creación de perfiles.</p>

                <h3>Legitimidad del tratamiento de datos</h3>
                <p>El tratamiento de los datos del local se basa en el consentimiento por parte del propietario o encargado expresado en el momento de cumplimentar el formulario.</p>

                <h3>Derecho a retirar el consentimiento</h3>
                <p>En caso de que un dueño de algún local en algún momento quiera dejar de formar parte del sistema de rastreo SafeEntrance deberá comunicarlo al responsable del tratamiento por cualquiera de los medios de contacto mencionados anteriormente. Una vez contactado, tras aportar la documentación necesaria que garantice la propiedad del local, se procederá a la eliminación de sus datos del sistema.</p>

                <h3>Destinatarios de los datos</h3>
                <p>Cualquier usuario que navegue por el sitio web y acceda al formulario de búsqueda de locales podrá consultar el nombre, dirección y aforo de los locales presentes en el sistema, así como los códigos QR únicos asociados a cada uno de ellos.</p>

                <h3>Tiempo de conservación de los datos</h3>
                <p>Debido a la gran importancia para la salud pública que tienen los sistemas de rastreo de enfermedades, en SafeEntrance se conservarán los datos de los locales indefinidamente salvo que se solicite su supresión o se anule el consentimiento.</p>

                <h3>Derechos del interesado</h3>
                <p>Cualquier afectado por el tratamiento de datos realizado en SafeEntrance tiene derecho a obtener información acerca del tratamiento de datos personales que le conciernen.</p>

                <h3>Derecho a presentar una reclamación ante la autoridad de control</h3>
                <p>En todo momento, cualquier afectado por la política de tratamiento de datos podrá presentar una reclamación ante la Agencia de Protección de Datos.</p>

                <h3>Propiedad intelectual</h3>
                <p>El código fuente, los diseños gráficos, iconos, animaciones, textos, así como la información y, en definitiva, los elementos contenidos en la página web están protegidos por la legislación española sobre los derechos de propiedad intelectual e industrial a favor de la Universidad de Oviedo. El usuario podrá utilizarlos para su uso personal, quedando prohibida la utilización con fines comerciales de los mismos. No está permitida la reproducción y/o publicación (total o parcial), ni su tratamiento informático, distribución, difusión, modificación, transformación o descompilación, sin el permiso previo y por escrito del titular. En caso de que se autorice la reproducción, se ha de indicar la procedencia de la información.</p>

                <h3>Ley aplicable</h3>
                <p>La ley aplicable en caso de disputa o conflicto de interpretación de los términos que conforman este aviso legal, así como cualquier cuestión relacionada con los servicios del presente portal, será la ley española vigente.</p>
            </Card>
        </div>
        );
    }
}

export default PrivacyTerms;