import { Supermarket } from "@/libs/types/Supermarket";
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Chip } from "@mui/material";
import { Box } from "../../../../../../node_modules/@mui/material/index";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const Selector = ({ selectedSupermarkets, systemSupermarkets, setSelectedSupermarkets }: { selectedSupermarkets: string[]; systemSupermarkets: Supermarket[]; setSelectedSupermarkets: any }) => {
	
	function handleChange(event: SelectChangeEvent<any>) {
		setSelectedSupermarkets(event.target.value) 
	}
	
	return (
		<FormControl sx={{ width: 300 }}>

			<InputLabel id="supermarkets-select-label">Supermercados</InputLabel>

			<Select
				labelId="supermarkets-select-label"
				id="supermarkets-select"
				multiple
				value={selectedSupermarkets}
				onChange={handleChange}
				input={<OutlinedInput label="Supermercados" />}
				MenuProps={MenuProps}
				renderValue={(selected: string[]) => (
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{selected.map((supermarketId: string) => {
							const selectedSupermarket = systemSupermarkets.find((sup) => sup.id === supermarketId);
							return selectedSupermarket ? <Chip key={selectedSupermarket.id} label={selectedSupermarket.name} /> : "";
						})}
					</Box>)
					}
				>

				{systemSupermarkets.map((sup: Supermarket) => (
					<MenuItem key={sup.id} value={sup.id}>
						<Checkbox checked={selectedSupermarkets.indexOf(sup.id) > -1} />
						<ListItemText primary={sup.name} />
					</MenuItem>
				))}

			</Select>
            
		</FormControl>
	);
};

export default Selector;
