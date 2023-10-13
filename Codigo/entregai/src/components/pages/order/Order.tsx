import { Supermarket } from "@/libs/types/Supermarket";
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useMemo, useState } from "react";

const Order = ({ systemSupermarkets }: { systemSupermarkets: Supermarket[] }) => {

    const [selectedSupermarketId, setSelectedSupermarketId] = useState('');

    const [selectedItemsId, setSelectedItemsId] = useState<string[]>([]);

    const selectedSupermarket: Supermarket = useMemo(() => {
        return systemSupermarkets.find((sup) => sup.id === selectedSupermarketId) as Supermarket;
    }, [selectedSupermarketId, systemSupermarkets]);

    function handleChange(event: SelectChangeEvent) {
        setSelectedSupermarketId(event.target.value);
    };

    function handleCheckbox(itemId: string) {
        if (selectedItemsId.includes(itemId)) {
            setSelectedItemsId(selectedItemsId.filter((id) => id !== itemId));
        } else {
            setSelectedItemsId([...selectedItemsId, itemId]);
        }
    }

	return (
		<div>
			<h1>Fazer Encomenda</h1>

            <p>Por favor, selecione o supermercado na sua região</p>

			<FormControl sx={{ width: 150 }}>
				
                <InputLabel id="supermarketSelectLabel">Supermercados</InputLabel>
				
                <Select
                    labelId="supermarketSelectLabel"
                    id="supermarketSelect" 
                    value={selectedSupermarketId} 
                    onChange={handleChange} 
                    label="Supermercados"
                >
                    {systemSupermarkets.map((sup: Supermarket) => (
                        <MenuItem key={sup.id} value={sup.id}>
                            <ListItemText primary={sup.name} />
                        </MenuItem>
                    ))}
				
                </Select>
			
            </FormControl>

            <p>Por favor, selecione os itens que deseja encomendar</p>

            {selectedSupermarket?.stock.map((item) => (
                <div key={item.id}>
                    <Checkbox 
                        checked={selectedItemsId.includes(item.id)} 
                        onChange={() => handleCheckbox(item.id)}
                    />
                    {item.stockQuantity == 0 ? item.name + " (Indisponível)" : item.name}
                </div>
            ))}
		</div>
	);
};

export default Order;
