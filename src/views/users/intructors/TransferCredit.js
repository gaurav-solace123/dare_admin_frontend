import React from "react";
import Paper from "@mui/material/Paper";
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

function TransferCredit() {
	return (
		<>
			{" "}
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
										<Typography variant="tableHead">
											Transferred Date
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant="tableHead">Transferred to</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant="tableHead">
											#Credits Transferred
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
										<Typography variant="tableText">testing</Typography>
									</TableCell>
									<TableCell
										align="center"
										sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
									>
										<Typography variant="tableText">100</Typography>
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
										<Typography variant="tableText">testing</Typography>
									</TableCell>
									<TableCell
										align="center"
										sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
									>
										<Typography variant="tableText">100</Typography>
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

export default TransferCredit;
