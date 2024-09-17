import React from "react";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Box,
	Tooltip,
} from "@mui/material";

function PurchaseCredit() {
	return (
		<>
			<Box sx={{ width: "100%", marginTop: "30px" }}>
				<Paper sx={{ width: "100%", mb: 2 }}>
					<TableContainer sx={{ borderRadius: "3px" }}>
						<Table>
							<TableHead
								style={{
									backgroundColor: "#d9edf7",
									borderRadius: "0 0 10px 2",
								}}
							>
								<TableRow>
									<TableCell align="center">
										<Typography variant="tableHead">Purchase Date</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant="tableHead">
											Purchase Credit#
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant="tableHead">Purchased Via</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant="tableHead">
											Transferred from
										</Typography>
									</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{/* Row 1 */}
								<TableRow>
									<TableCell
										align="center"
										sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
									>
										<Typography variant="tableText">16/09/2024</Typography>
									</TableCell>
									<TableCell
										align="center"
										sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
									>
										<Typography variant="tableText">100</Typography>
									</TableCell>
									<TableCell
										align="center"
										sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
									>
										<Typography variant="tableText">
											<Chip
												label="Offline"
												sx={{
													backgroundColor: "#ebebeb",
													color: "#000000de",
													minWidth: "100px",
												}}
											/>
										</Typography>
									</TableCell>
									<TableCell
										align="center"
										sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
									>
										<Typography variant="tableText">Testing</Typography>
									</TableCell>
								</TableRow>

								<TableRow>
									<TableCell
										align="center"
										sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
									>
										<Typography variant="tableText">16/09/2024</Typography>
									</TableCell>
									<TableCell
										align="center"
										sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
									>
										<Typography variant="tableText">100</Typography>
									</TableCell>
									<TableCell
										align="center"
										sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
									>
										<Typography variant="tableText">
											<Chip
												label="Online"
												sx={{
													backgroundColor: "#2e7d32de",
													color: "#fff",
													minWidth: "100px",
												}}
											/>
										</Typography>
									</TableCell>
									<TableCell
										align="center"
										sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
									>
										<Typography variant="tableText">Testing</Typography>
									</TableCell>
								</TableRow>

								<TableRow>
									<TableCell
										align="center"
										sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
									>
										<Typography variant="tableText">16/09/2024</Typography>
									</TableCell>
									<TableCell
										align="center"
										sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
									>
										<Typography variant="tableText">100</Typography>
									</TableCell>
									<TableCell
										align="center"
										sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
									>
										<Typography variant="tableText">
											<Chip
												label="Transferred"
												sx={{
													backgroundColor: "#1976d2eb",
													color: "#fff",
													minWidth: "100px",
												}}
											/>
										</Typography>
									</TableCell>
									<TableCell
										align="center"
										sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
									>
										<Typography variant="tableText">Testing</Typography>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Box>
		</>
	);
}

export default PurchaseCredit;
