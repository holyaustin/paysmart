import axios from 'axios';

const dbname = process.env.TABLELAND_TABLE as string;
const endpoint = 'https://testnet.tableland.network/rpc';

const token = process.env.TABLELAND_TOKEN as string;
const address = process.env.TABLELAND_CONTROLLER as string;

function createStatementPayload(statement: string, controller: string): string {
  return `{
        "jsonrpc": "2.0",
        "method": "tableland_runSQL",
        "id": 1,
        "params": [{
          "controller": "${controller}",
          "statement": "${statement}"
        }]
    }`;
}

export interface DescriptionData {
  ipfs_cid: string
  timestamp: number
}

// Note: this code doesn't do any sanitizing & escaping. Make sure that parameters
// are sanitized before calling this class.
export class TableLandService {
  async store(contract_: string, id: number, cid: string) {
    const contract = contract_.toLowerCase();
    const payload = createStatementPayload(`INSERT INTO ${dbname}(contract, id, description, t) VALUES ('${contract}', ${id}, '${cid}', now()) ON CONFLICT(contract, id) DO UPDATE SET description = '${cid}', t=now();`, address);
    await axios.post(endpoint, payload, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
    // const data = response.data;

    // console.log(data);
  }

  async fetch(contract_: string, id: number): Promise<DescriptionData | null> {
    const contract = contract_.toLowerCase();
    const payload = createStatementPayload(`SELECT description, extract(EPOCH from t) as timestamp FROM ${dbname} WHERE contract='${contract}' AND id=${id}`, address);
    const response = await axios.post(endpoint, payload, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
    const data = response.data;
    if (data.result && data.result.data && data.result.data.rows) {
      const rows = data.result.data.rows;
      if (rows.length && rows[0].length)
        return { ipfs_cid: rows[0][0], timestamp: rows[0][1] };
    }
    return null;
  }
}
