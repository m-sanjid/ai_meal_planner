import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";

export default function AppLayout() {
	return (
		<div className="flex h-full">
			<AppSidebar />
			<main className="w-full">
				<Outlet />
			</main>
		</div>
	);
}
