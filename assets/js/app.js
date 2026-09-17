const PROJECTS_CONTAINER = document.getElementById(
    "proyectos"
);

const VIEWER_CONTAINER = document.getElementById(
    "visor-container"
);

const MAP_VIEWER = document.getElementById(
    "map-viewer"
);

const VIEWER_TITLE = document.getElementById(
    "visor-title"
);

const VIEWER_PERIOD = document.getElementById(
    "visor-period"
);

const CLOSE_VIEWER = document.getElementById(
    "close-viewer"
);

const REFRESH_VIEWER = document.getElementById(
    "refresh-viewer"
);

function formatPeriod(period) {

    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];

    const year = period.slice(0, 4);

    const month = Number(
        period.slice(4, 6)
    );

    return `${months[month - 1]} ${year}`;
}


function sortVersions(versions) {

    return [...versions].sort(
        (a, b) =>
            b.periodo.localeCompare(
                a.periodo
            )
    );

}


function openMap(
    project,
    version
) {

    VIEWER_TITLE.textContent =
        project.nombre;

    const periodLabel =
        version.etiqueta ??
        formatPeriod(version.periodo);

    VIEWER_PERIOD.textContent =
        `Referencia: ${periodLabel}`;

    MAP_VIEWER.src =
        `./${version.archivo}`;

    VIEWER_CONTAINER.classList.remove(
        "hidden"
    );

    VIEWER_CONTAINER.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


function createProjectCard(project) {

    const card =
        document.createElement("article");

    card.className =
        "project-card";


    const title =
        document.createElement("h3");

    title.textContent =
        project.nombre;


    const description =
        document.createElement("p");

    description.textContent =
        project.descripcion;


    const controls =
        document.createElement("div");

    controls.className =
        "project-card__controls";


    const select =
        document.createElement("select");

    select.setAttribute(
        "aria-label",
        `Periodo de ${project.nombre}`
    );


    const versions =
        sortVersions(
            project.versiones
        );


    versions.forEach(
        version => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                version.periodo;

            option.textContent =
                version.etiqueta ??
                formatPeriod(version.periodo);

            select.appendChild(
                option
            );

        }
    );


    const button =
        document.createElement("button");

    button.type =
        "button";

    button.className =
        "button button--primary";

    button.textContent =
        "Visualizar";


    button.addEventListener(
        "click",
        () => {

            const selectedVersion =
                versions.find(
                    version =>
                        version.periodo ===
                        select.value
                );

            openMap(
                project,
                selectedVersion
            );

        }
    );


    controls.append(
        select,
        button
    );


    card.append(
        title,
        description,
        controls
    );


    return card;
}


async function loadProjects() {

    try {

        const response =
            await fetch(
                "./data/mapas.json"
            );


        if (!response.ok) {

            throw new Error(
                "No fue posible cargar el catálogo de mapas."
            );

        }


        const data =
            await response.json();


        const activeProjects =
            data.proyectos.filter(
                project =>
                    project.activo !== false
            );


        activeProjects.forEach(
            project => {

                const card =
                    createProjectCard(
                        project
                    );

                PROJECTS_CONTAINER.appendChild(
                    card
                );

            }
        );

    }
    catch (error) {

        console.error(error);

        PROJECTS_CONTAINER.innerHTML = `
            <p>
                No fue posible cargar los proyectos
                disponibles.
            </p>
        `;

    }

}

REFRESH_VIEWER.addEventListener(
    "click",
    () => {

        const currentUrl =
            new URL(
                MAP_VIEWER.src
            );

        currentUrl.searchParams.set(
            "refresh",
            Date.now()
        );

        MAP_VIEWER.src =
            currentUrl.toString();

    }
);


CLOSE_VIEWER.addEventListener(
    "click",
    () => {

        MAP_VIEWER.src = "";

        VIEWER_CONTAINER.classList.add(
            "hidden"
        );

    }
);


loadProjects();