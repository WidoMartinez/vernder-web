import React from "react";

const EmailTemplate = ({ data }) => {
	const { name, email, phone, service, message } = data;

	const styles = {
		body: {
			fontFamily: "'Manrope', sans-serif",
			backgroundColor: "#2a1d1d",
			color: "#f3f4f6",
			margin: 0,
			padding: "20px",
		},
		container: {
			maxWidth: "600px",
			margin: "0 auto",
			backgroundColor: "#402f2f",
			borderRadius: "12px",
			overflow: "hidden",
			border: "1px solid #574040",
		},
		header: {
			backgroundColor: "#d97706",
			padding: "40px",
			textAlign: "center",
		},
		headerTitle: {
			margin: 0,
			color: "#ffffff",
			fontSize: "28px",
			fontWeight: 700,
		},
		content: {
			padding: "40px",
		},
		contentTitle: {
			fontSize: "22px",
			fontWeight: 600,
			color: "#f59e0b",
			marginBottom: "20px",
		},
		detailItem: {
			marginBottom: "18px",
			fontSize: "16px",
		},
		detailLabel: {
			fontWeight: 600,
			color: "#a8a29e",
			display: "block",
			marginBottom: "4px",
		},
		detailValue: {
			color: "#f3f4f6",
		},
		messageSection: {
			backgroundColor: "#574040",
			padding: "20px",
			borderRadius: "8px",
			marginTop: "20px",
		},
		footer: {
			textAlign: "center",
			padding: "30px",
			fontSize: "14px",
			color: "#a8a29e",
		},
		footerLink: {
			color: "#d97706",
			textDecoration: "none",
		},
	};

	return (
		<div style={styles.body}>
			<div style={styles.container}>
				<div style={styles.header}>
					<h1 style={styles.headerTitle}>Confirmación de tu Cotización</h1>
				</div>
				<div style={styles.content}>
					<h2 style={styles.contentTitle}>¡Hola, {name}!</h2>
					<p style={{ color: "#a8a29e", lineHeight: 1.6, fontSize: "16px" }}>
						Hemos recibido tu solicitud de cotización y nos pondremos en
						contacto contigo a la brevedad. A continuación, te dejamos un
						resumen de los datos que nos proporcionaste:
					</p>
					<div
						style={{ borderTop: "1px solid #574040", margin: "20px 0" }}
					></div>
					<div style={styles.detailItem}>
						<span style={styles.detailLabel}>Servicio de Interés:</span>
						<span style={styles.detailValue}>{service}</span>
					</div>
					<div style={styles.detailItem}>
						<span style={styles.detailLabel}>Nombre:</span>
						<span style={styles.detailValue}>{name}</span>
					</div>
					<div style={styles.detailItem}>
						<span style={styles.detailLabel}>Email:</span>
						<span style={styles.detailValue}>{email}</span>
					</div>
					{phone && (
						<div style={styles.detailItem}>
							<span style={styles.detailLabel}>Teléfono:</span>
							<span style={styles.detailValue}>{phone}</span>
						</div>
					)}
					<div style={styles.detailItem}>
						<span style={styles.detailLabel}>Tu Mensaje:</span>
						<div style={styles.messageSection}>
							<p
								style={{ color: "#f3f4f6", margin: 0, whiteSpace: "pre-wrap" }}
							>
								{message}
							</p>
						</div>
					</div>
				</div>
				<div style={styles.footer}>
					<p>
						© {new Date().getFullYear()} Nubestilo. Todos los derechos
						reservados.
					</p>
					<p>
						Si tienes alguna pregunta, no dudes en{" "}
						<a href="mailto:contacto@nubestilo.com" style={styles.footerLink}>
							contactarnos
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
};

export default EmailTemplate;
