interface MapParams {
	type: string
	x: string
	y: string
	z: string
}

interface MapSource {
	name: string
	type: string
	url: string
	handler?(sourceUrl: string, params: MapParams): Promise<Response>
}
