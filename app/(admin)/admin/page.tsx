import Link from "next/link";

export default async function AdminHome() {
	return (
		<div>
			<div>Welcome</div>
			<Link href="/admin/users">Users</Link>
			<Link href="/admin/messages">Recent Messages</Link>
			<form>
				<label>Search Messages by user email</label>
				<input type="text" placeholder="Search" />
				<button type="submit">Search</button>
			</form>
			<form>
				<label>Search Messages by user name</label>
				<input type="text" placeholder="Search" />
				<button type="submit">Search</button>
			</form>
		</div>
	);
}
