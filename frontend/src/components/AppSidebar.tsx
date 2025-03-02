import {
	LayoutDashboard,
	Settings,
	ShoppingBasket,
	Soup,
	Star,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarTrigger,
} from "./ui/sidebar";
import { NavUser } from "./NavUser";
import { useUser } from "@clerk/clerk-react";

const AppSidebar = () => {
	const { user } = useUser();
	const userItem = {
		name: user?.firstName,
		email: user?.emailAddresses.toString(),
		avatar: user?.imageUrl,
	};
	return (
		<Sidebar className="pt-16" collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<SidebarTrigger
								size={"lg"}
								className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
							/>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{sidebarLinks.map((item) => (
								<SidebarMenuItem key={item.name}>
									<SidebarMenuButton
										asChild
										className="my-1 hover:bg-neutral-200"
									>
										<a href={item.href}>
											{item.icon}
											<span className="ml-3">{item.name}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={userItem} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
};

export default AppSidebar;

const sidebarLinks = [
	{ name: "Generate", href: "/meal", icon: <Soup /> },
	{ name: "Favorites", href: "/user/favorites", icon: <Star /> },
	{ name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
	{ name: "Shopping", href: "#", icon: <ShoppingBasket /> },
	{ name: "Settings", href: "/settings", icon: <Settings /> },
];
