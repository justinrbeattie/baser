import { component$ } from '@builder.io/qwik';
import { Link, RouteLocation } from '@builder.io/qwik-city';
import { useLocation } from '@builder.io/qwik-city';



export const AuxLink = component$((props: AuxLinkProps) => {
    const location = useLocation();
/*     const navigate = useNavigate(); */
    return (
/*         <button onClick$={() => window.history.replaceState(null, '', getQueryString(location, props))}>qqq</button> */
<Link href={getQueryString(location, props)} class="my-link">
spa navigation
</Link>
    );
});

const getQueryString = (location: RouteLocation, props: AuxLinkProps) => {
 location.url.searchParams.set(props.level, props.href);   
    return '?' + location.url.searchParams.toString().replace('%2F', '/' );
};


interface AuxLinkProps {
    level: 'l1' | 'l1';
    href: string;
}